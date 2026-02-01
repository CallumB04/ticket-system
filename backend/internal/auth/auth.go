package auth

import (
	"context"
	"crypto/ecdsa"
	"crypto/elliptic"
	"crypto/rsa"
	"encoding/base64"
	"encoding/json"
	"errors"
	"math/big"
	"net/http"
	"os"
	"strings"
	"sync"
	"time"

	"github.com/CallumB04/ticket-system/backend/internal/util"
	"github.com/golang-jwt/jwt/v5"
)

const UserIDKey string = "userID"

// Models for JSON Web Key's
type jwksDoc struct {
	Keys []jwk `json:"keys"`
}

type jwk struct {
	Kid string `json:"kid"` // Key ID
	Kty string `json:"kty"` // Key type - "RSA" or "EC"

	// RSA
	N string `json:"n"` // Modulus
	E string `json:"e"` // Exponent

	// EC
	Crv string `json:"crv"` // Curve - e.g. "P-256"
	X   string `json:"x"`   // X coordinate
	Y   string `json:"y"`   // Y coordinate
}

type jwksCache struct {
	mu        sync.RWMutex
	keysByKid map[string]any // *rsa.PublicKey or *ecdsa.PublicKey
	expiresAt time.Time
}

var cachedJWKS = &jwksCache{}

// Verifies the Supabase JWT from the Authorization header in the request
// and stores the Supabase user id (sub) in request context.
// Used as middleware to run auth checks before reaching handlers.
func AuthMiddleware(next http.Handler) http.HandlerFunc {
	// Remove potential trailing '/' from supabase url in environment variable.
	supabaseURL := strings.TrimRight(os.Getenv("SUPABASE_URL"), "/")
	if supabaseURL == "" {
		panic("SUPABASE_URL is required")
	}

	// Construct expected JWT issuer.
	issuer := supabaseURL + "/auth/v1"

	return func(w http.ResponseWriter, r *http.Request) {
		// Extract JWT from request header, return 401 if missing.
		token := getTokenFromHeader(r.Header.Get("Authorization"))
		if token == "" {
			util.ErrorResponse(w, http.StatusUnauthorized, "missing bearer token")
			return
		}

		// Create JWT parser, supporting either ES256 or RS256 algorithm methods.
		parser := jwt.NewParser(jwt.WithValidMethods([]string{"ES256", "RS256"}))

		tok, err := parser.Parse(token, func(t *jwt.Token) (any, error) {
			// Extract key ID from JWT header.
			// Allow us to identify which public key was used to sign this token.
			kid, _ := t.Header["kid"].(string)
			if kid == "" {
				return nil, errors.New("missing kid")
			}

			// Get keys from cache if valid, else fetch JWKS from supabase and rebuild.
			keys, err := getJWKS(supabaseURL, cachedJWKS)
			if err != nil {
				return nil, err
			}

			// Get public key used to sign this token from the key ID (kid).
			pub, ok := keys[kid]
			if !ok {
				// Force a key rotation. Clear cache and refetch JWKS.
				// Retry only once, to avoid infinite refresh loop.
				cachedJWKS.mu.Lock()
				cachedJWKS.expiresAt = time.Time{}
				cachedJWKS.mu.Unlock()

				keys, err = getJWKS(supabaseURL, cachedJWKS)
				if err != nil {
					return nil, err
				}
				pub, ok = keys[kid]
				if !ok {
					return nil, errors.New("unknown kid")
				}
			}

			return pub, nil
		})

		// Ensure parsed token is valid
		if err != nil || !tok.Valid {
			util.ErrorResponse(w, http.StatusUnauthorized, "invalid token")
			return
		}

		// Ensure second segment of the token is valid structure
		claims, ok := tok.Claims.(jwt.MapClaims)
		if !ok {
			util.ErrorResponse(w, http.StatusUnauthorized, "invalid claims")
			return
		}

		// Ensure token is from this supabase project, despite valid signature
		if iss, _ := claims["iss"].(string); iss != issuer {
			util.ErrorResponse(w, http.StatusUnauthorized, "invalid issuer")
			return
		}

		// Ensure subject (user) exists in JWT claims
		sub, _ := claims["sub"].(string)
		if sub == "" {
			util.ErrorResponse(w, http.StatusUnauthorized, "missing sub")
			return
		}

		// Store sub (user ID within JWT) in context to use within handlers.
		// Allows handlers to scope DB queries to that user.
		ctx := context.WithValue(r.Context(), UserIDKey, sub)
		next.ServeHTTP(w, r.WithContext(ctx)) // pass request onto respective handler
	}
}

// Extracts JWT from authorization header
func getTokenFromHeader(header string) string {
	header = strings.TrimSpace(header) // remove leading/trailing whitespace

	// Check header is prefixed by 'Bearer'
	if !strings.HasPrefix(strings.ToLower(header), "bearer ") {
		return ""
	}

	// Remove 'Bearer' + remaining whitespace, and return JWT
	return strings.TrimSpace(header[len("bearer "):])
}

// Retreive public keys from cache, or fetch JWKS from supabase and rebuild if required.
// Returns map of key ID's (kid) to public keys.
// Will use kid provided within JWT header to identify which public key was
// used to sign this token.
func getJWKS(supabaseURL string, cache *jwksCache) (map[string]any, error) {
	// Allow multiple requests to read the cache at once without blocking.
	cache.mu.RLock()

	// If keys are present in cache and are not expired, return them.
	if cache.keysByKid != nil && time.Now().Before(cache.expiresAt) {
		defer cache.mu.RUnlock()
		return cache.keysByKid, nil
	}

	// Release read lock on cache.
	// Since the function has reached this point, cache is rather missing or expired.
	cache.mu.RUnlock()

	// Add write lock to cache.
	// Ensures only one request refreshes the cache at a time.
	cache.mu.Lock()
	defer cache.mu.Unlock() // Release write lock when request has finished

	// Check cache once more incase another request has already refreshed the cache.
	if cache.keysByKid != nil && time.Now().Before(cache.expiresAt) {
		return cache.keysByKid, nil
	}

	// Fetch JWKS from Supabase.
	resp, err := http.Get(supabaseURL + "/auth/v1/.well-known/jwks.json")
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	// Decode response containing JWKS into a struct.
	var doc jwksDoc
	if err := json.NewDecoder(resp.Body).Decode(&doc); err != nil {
		return nil, err
	}

	// Convert JWKS into map of key ID's (kid) to public keys.
	keys := make(map[string]any)
	for _, k := range doc.Keys {
		switch k.Kty {

		// Used for RS256 tokens.
		case "RSA":
			// Ensure required fields exist.
			if k.Kid == "" || k.N == "" || k.E == "" {
				continue
			}

			// Build public key
			pub, err := rsaPublicKeyFromModExp(k.N, k.E)
			if err != nil {
				continue
			}

			// Store kid and public key in map
			keys[k.Kid] = pub

		// Used for ES256 tokens.
		case "EC":
			// Ensure required fields exist.
			if k.Kid == "" || k.Crv == "" || k.X == "" || k.Y == "" {
				continue
			}

			// Build public key
			pub, err := ecdsaPublicKeyFromXY(k.Crv, k.X, k.Y)
			if err != nil {
				continue
			}

			// Store kid and public key in map
			keys[k.Kid] = pub
		}
	}

	// Ensure parsed keys map is not empty.
	if len(keys) == 0 {
		return nil, errors.New("no jwks keys parsed")
	}

	// Cache public keys for future requests.
	// Keys remain in cache for 6 hours before expiring.
	cache.keysByKid = keys
	cache.expiresAt = time.Now().Add(6 * time.Hour)

	return keys, nil
}

// Builds an RSA public key from JWK.
func rsaPublicKeyFromModExp(nB64URL, eB64URL string) (*rsa.PublicKey, error) {
	// Decode modulus.
	nb, err := base64.RawURLEncoding.DecodeString(nB64URL)
	if err != nil {
		return nil, err
	}

	// Decode exponent.
	eb, err := base64.RawURLEncoding.DecodeString(eB64URL)
	if err != nil {
		return nil, err
	}

	// Convert modulus bytes into a big integer.
	n := new(big.Int).SetBytes(nb)

	// Convert exponent bytes into an integer.
	e := 0
	for _, b := range eb {
		e = (e << 8) + int(b)
	}
	if e == 0 {
		return nil, errors.New("bad exponent")
	}

	// Construct and return the public key object.
	return &rsa.PublicKey{N: n, E: e}, nil
}

// Builds an ECDSA public key from JWK.
func ecdsaPublicKeyFromXY(crv, xB64URL, yB64URL string) (*ecdsa.PublicKey, error) {
	// Decode X coordinate.
	xb, err := base64.RawURLEncoding.DecodeString(xB64URL)
	if err != nil {
		return nil, err
	}

	// Decode Y coordinate.
	yb, err := base64.RawURLEncoding.DecodeString(yB64URL)
	if err != nil {
		return nil, err
	}

	// Select elliptic curve from JWK string.
	var curve elliptic.Curve
	switch crv {
	case "P-256":
		curve = elliptic.P256()
	case "P-384":
		curve = elliptic.P384()
	case "P-521":
		curve = elliptic.P521()
	default:
		return nil, errors.New("unsupported curve: " + crv)
	}

	// Convert coordinates from bytes into big integers.
	x := new(big.Int).SetBytes(xb)
	y := new(big.Int).SetBytes(yb)

	// Construct and return the public key object.
	return &ecdsa.PublicKey{Curve: curve, X: x, Y: y}, nil
}

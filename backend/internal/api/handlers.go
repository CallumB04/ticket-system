package api

import (
	"net/http"

	"github.com/CallumB04/ticket-system/backend/internal/auth"
	"github.com/jackc/pgx/v5/pgxpool"
)

// Register handlers to REST api routes.
func RegisterHandlers(db *pgxpool.Pool) *http.ServeMux {
	// Create multiplexer
	mux := http.NewServeMux()

	// --- v1 ---
	v1 := http.NewServeMux()
	v1.Handle("GET /", handleRoot())

	// User Profiles (non-plural route as user can only have one profile)
	v1.Handle("GET /profile", auth.AuthMiddleware(handleFetchUserProfile(db)))

	// Organisations
	v1.Handle("GET /organisations", auth.AuthMiddleware(handleFetchOrganisations(db)))
	v1.Handle("POST /organisations", auth.AuthMiddleware(handleCreateOrganisation(db)))

	// Organisation Members
	v1.Handle("GET /organisations/{orgID}/members", auth.AuthMiddleware(handleFetchOrganisationMembers(db)))

	// Mount v1 routes under /v1 prefix
	mux.Handle("/v1/", http.StripPrefix("/v1", v1))

	return mux
}

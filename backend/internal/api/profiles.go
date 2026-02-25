package api

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"strings"

	"github.com/CallumB04/ticket-system/backend/internal/auth"
	"github.com/CallumB04/ticket-system/backend/internal/models"
	"github.com/CallumB04/ticket-system/backend/internal/util"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

// Request Models

// Using pointers to differentiate between the user not wanting to change a value...
// and wanting to set a value to an empty string
type updateUserProfileRequest struct {
	FirstName *string `json:"first_name"`
	LastName  *string `json:"last_name"`
	AvatarURL *string `json:"avatar_url"`
	Country   *string `json:"country"`
}

// Handlers
func handleFetchUserProfile(db *pgxpool.Pool) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Get user ID of authenticated user, provided by middleware.
		userID := r.Context().Value(auth.UserIDKey).(string)

		// Create empty object for user profile
		var profile models.UserProfile

		// Query database for user profile owned by this user.
		// $1 - Authenticated User's ID
		err := db.QueryRow(r.Context(), `
		select id, first_name, last_name, avatar_url, country, created_at
		from public.user_profiles
		where id = $1
		limit 1`, userID).Scan(&profile.ID, &profile.FirstName, &profile.LastName, &profile.AvatarURL, &profile.Country, &profile.CreatedAt)

		if err != nil {
			// User profile not found error
			if errors.Is(err, pgx.ErrNoRows) {
				util.ErrorResponse(w, http.StatusNotFound, "profile not found")
				return
			}

			// Other error
			log.Printf("FETCH PROFILE db error: %v", err)
			util.ErrorResponse(w, http.StatusInternalServerError, "db error")
			return
		}

		// return user profile to client
		util.JSONResponse(w, http.StatusOK, profile)
	}
}

func handleUpdateUserProfile(db *pgxpool.Pool) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Get user ID of authenticated user, provided by middleware.
		userID := r.Context().Value(auth.UserIDKey).(string)

		var req updateUserProfileRequest

		// Decode request body into request object
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			util.ErrorResponse(w, http.StatusBadRequest, "invalid request body")
		}

		// Build query to update profile in db
		query := `UPDATE public.user_profiles SET ` // base query
		args := []interface{}{}
		pos := 1 // increments for each updated field, to add arg position for formatting

		if req.FirstName != nil {
			query += fmt.Sprintf("first_name = $%d,", pos)
			args = append(args, *req.FirstName)
			pos++
		}
		if req.LastName != nil {
			query += fmt.Sprintf("last_name = $%d,", pos)
			args = append(args, *req.LastName)
			pos++
		}
		if req.AvatarURL != nil {
			query += fmt.Sprintf("avatar_url = $%d,", pos)
			args = append(args, *req.AvatarURL)
			pos++
		}
		if req.Country != nil {
			query += fmt.Sprintf("country = $%d,", pos)
			args = append(args, *req.Country)
			pos++
		}

		// Return error if no valid profile changes were provided
		if len(args) == 0 {
			util.ErrorResponse(w, http.StatusBadRequest, "invalid request body")
		}

		// Remove trailing comma
		query = strings.TrimSuffix(query, ",")

		// Add WHERE clause to query
		query += fmt.Sprintf(" WHERE id = $%d RETURNING id, first_name, last_name, avatar_url, country, created_at", pos)
		args = append(args, userID) // add user id to args, for inserting into query

		// Update user profile in db and receive new user object
		var profile models.UserProfile

		err := db.QueryRow(r.Context(), query, args...).Scan(
			&profile.ID,
			&profile.FirstName,
			&profile.LastName,
			&profile.AvatarURL,
			&profile.Country,
			&profile.CreatedAt,
		)

		if err != nil {
			// User profile not found error
			if errors.Is(err, pgx.ErrNoRows) {
				util.ErrorResponse(w, http.StatusNotFound, "profile not found")
				return
			}

			// Other error
			log.Printf("UPDATE PROFILE db error: %v", err)
			util.ErrorResponse(w, http.StatusInternalServerError, "db error")
			return
		}

		// Return updated user profile to client
		util.JSONResponse(w, http.StatusOK, profile)
	}
}

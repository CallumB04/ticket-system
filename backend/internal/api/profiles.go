package api

import (
	"errors"
	"log"
	"net/http"

	"github.com/CallumB04/ticket-system/backend/internal/auth"
	"github.com/CallumB04/ticket-system/backend/internal/models"
	"github.com/CallumB04/ticket-system/backend/internal/util"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

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
		select id, first_name, last_name, avatar_url, created_at
		from public.user_profiles
		where id = $1
		limit 1`, userID).Scan(&profile.ID, &profile.FirstName, &profile.LastName, &profile.AvatarURL, &profile.CreatedAt)

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

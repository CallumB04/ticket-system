package api

import (
	"errors"
	"net/http"
	"time"

	"github.com/CallumB04/ticket-system/backend/internal/auth"
	"github.com/CallumB04/ticket-system/backend/internal/models"
	"github.com/CallumB04/ticket-system/backend/internal/util"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

// Handlers

func handleFetchNotifications(db *pgxpool.Pool) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Get user ID of authenticated user, provided by middleware.
		userID := r.Context().Value(auth.UserIDKey).(string)

		// Query database for notifications assigned to this user.
		// Order notifications in descending order of creation date (newest first)
		// $1 - Authenticated User's ID
		rows, err := db.Query(r.Context(), `
			SELECT id, type, description, read, archived, created_at
			FROM public.notifications
			WHERE user_id = $1
			ORDER BY created_at DESC
		`, userID)
		if err != nil {
			util.ErrorResponse(w, http.StatusInternalServerError, "error fetching notifications")
			return
		}

		// Close db rows after responding to client.
		defer rows.Close()

		// Append results from database query into array of notifications.
		var notifications []models.Notification
		for rows.Next() {
			var (
				id          string
				notiType    string // cant use 'type' due to existing keyword
				description string
				read        bool
				archived    bool
				createdAt   time.Time
			)

			if err := rows.Scan(&id, &notiType, &description, &read, &createdAt); err != nil {
				util.ErrorResponse(w, http.StatusInternalServerError, "error reading notifications")
				return
			}

			notifications = append(notifications, models.Notification{
				ID:          id,
				Type:        notiType,
				Description: description,
				Read:        read,
				Archived:    archived,
				CreatedAt:   createdAt,
			})
		}

		// Send notifications to client
		util.JSONResponse(w, http.StatusOK, notifications)
	}
}

func handleMarkNotificationRead(db *pgxpool.Pool) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Get user ID of authenticated user, provided by middleware.
		userID := r.Context().Value(auth.UserIDKey).(string)

		// Get notification id from request URL
		notificationID := r.PathValue("notificationID")
		if notificationID == "" {
			util.ErrorResponse(w, http.StatusBadRequest, "notificationID is required")
			return
		}

		var notification models.Notification

		// Update notification in database
		// $1 - Notification ID
		// $2 - Authenticated User's ID
		err := db.QueryRow(r.Context(), `
			UPDATE public.notifications
			SET read = TRUE
			WHERE id = $1 AND user_id = $2
			RETURNING id, type, description, read, archived, created_at
		`, notificationID, userID).Scan(&notification.ID, &notification.Type, &notification.Description, &notification.Read, &notification.Archived, &notification.CreatedAt)

		if err != nil {
			// Notification not found
			if errors.Is(err, pgx.ErrNoRows) {
				util.ErrorResponse(w, http.StatusNotFound, "notification not found")
				return
			}

			// Other error
			util.ErrorResponse(w, http.StatusInternalServerError, "error marking notification as read")
			return
		}

		// Send notification to client
		util.JSONResponse(w, http.StatusOK, notification)
	}
}

func handleArchiveNotification(db *pgxpool.Pool) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Get user ID of authenticated user, provided by middleware.
		userID := r.Context().Value(auth.UserIDKey).(string)

		// Get notification id from request URL
		notificationID := r.PathValue("notificationID")
		if notificationID == "" {
			util.ErrorResponse(w, http.StatusBadRequest, "notificationID is required")
			return
		}

		var notification models.Notification

		// Update notification in database
		// $1 - Notification ID
		// $2 - Authenticated User's ID
		err := db.QueryRow(r.Context(), `
			UPDATE public.notifications
			SET archived = TRUE
			WHERE id = $1 AND user_id = $2
			RETURNING id, type, description, read, archived, created_at
		`, notificationID, userID).Scan(&notification.ID, &notification.Type, &notification.Description, &notification.Read, &notification.Archived, &notification.CreatedAt)

		if err != nil {
			// Notification not found
			if errors.Is(err, pgx.ErrNoRows) {
				util.ErrorResponse(w, http.StatusNotFound, "notification not found")
				return
			}

			// Other error
			util.ErrorResponse(w, http.StatusInternalServerError, "error archiving notification")
			return
		}

		// Send notification to client
		util.JSONResponse(w, http.StatusOK, notification)
	}
}

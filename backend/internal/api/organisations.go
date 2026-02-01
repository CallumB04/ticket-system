package api

import (
	"encoding/json"
	"log"
	"net/http"
	"strings"
	"time"

	"github.com/CallumB04/ticket-system/backend/internal/util"
	"github.com/jackc/pgx/v5/pgxpool"
)

// Models

type Organisation struct {
	ID          int64     `json:"id"`
	Name        string    `json:"name"`
	Description *string   `json:"description"`
	CreatedAt   time.Time `json:"created_at"`
	CreatedBy   string    `json:"created_by"` // organisation owner
}

type createOrganisationRequest struct {
	Name        string `json:"name"`
	Description string `json:"description"`
}

// Handlers

// Returns a list of organisations that are created by the authenticated user.
func handleFetchOrganisations(db *pgxpool.Pool) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Get user ID of authenticated user, provided by middleware.
		userID := r.Context().Value(userIDKey).(string)

		// Query database for organisations owned by this user.
		// $1 - Authenticated User's ID
		rows, err := db.Query(r.Context(), `
			select id, name, description, created_at, created_by
			from public.organisations
			where created_by = $1
			order by id desc
		`, userID)
		if err != nil {
			log.Printf("FETCH ORGS db error: %v", err)
			util.ErrorResponse(w, http.StatusInternalServerError, "db error")
			return
		}

		// Close db rows after responding to client.
		defer rows.Close()

		// Append results from database query into array of organisations.
		var orgArr []Organisation
		for rows.Next() {
			var org Organisation
			if err := rows.Scan(&org.ID, &org.Name, &org.Description, &org.CreatedAt, &org.CreatedBy); err != nil {
				util.ErrorResponse(w, http.StatusInternalServerError, "db error")
				return
			}
			orgArr = append(orgArr, org)
		}

		// Send organisations to client.
		util.JSONResponse(w, http.StatusOK, orgArr)
	}
}

// Creates a new organisation, owned by the authenicated user, and returns the organisation.
func handleCreateOrganisation(db *pgxpool.Pool) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Get user ID of authenticated user, provided by middleware.
		userID := r.Context().Value(userIDKey).(string)

		// Decode request body into request struct.
		var body createOrganisationRequest
		if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
			util.ErrorResponse(w, http.StatusBadRequest, "invalid json")
			return
		}

		// Remove whitespace from organisation name provided and ensure it's not empty.
		body.Name = strings.TrimSpace(body.Name)
		if body.Name == "" {
			util.ErrorResponse(w, http.StatusBadRequest, "missing name")
			return
		}

		// Convert description to a pointer, since field is nullable in db.
		// If description is empty, will send nil pointer.
		description := strings.TrimSpace(body.Description)
		var descriptionPtr *string
		if description != "" {
			descriptionPtr = &description
		}

		// Insert new organisation into db and return the inserted row.
		// $1 - Organisation name
		// $2 - Organisation Description (optional)
		// $3 - Authenticated User's ID
		var org Organisation
		err := db.QueryRow(r.Context(), `
			insert into public.organisations (name, description, created_by)
			values ($1, $2, $3)
			returning id, name, description, created_at, created_by
		`, body.Name, descriptionPtr, userID).Scan(
			&org.ID, &org.Name, &org.Description, &org.CreatedAt, &org.CreatedBy,
		)
		if err != nil {
			log.Printf("CREATE ORG db error: %v", err)
			util.ErrorResponse(w, http.StatusInternalServerError, "db error")
			return
		}

		// Send created organisation to client.
		util.JSONResponse(w, http.StatusCreated, org)
	}
}

package api

import (
	"encoding/json"
	"log"
	"net/http"
	"strings"
	"time"

	"github.com/CallumB04/ticket-system/backend/internal/auth"
	"github.com/CallumB04/ticket-system/backend/internal/models"
	"github.com/CallumB04/ticket-system/backend/internal/util"
	"github.com/jackc/pgx/v5/pgxpool"
)

// Request Models

type createOrganisationRequest struct {
	Name    string `json:"name"`
	LogoURL string `json:"logo_url"`
}

// Handlers

// Returns a list of organisations that the authenticated user is a member within.
func handleFetchOrganisations(db *pgxpool.Pool) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Get user ID of authenticated user, provided by middleware.
		userID := r.Context().Value(auth.UserIDKey).(string)

		// Query database for organisations this user is a member within.
		// $1 - Authenticated User's ID
		rows, err := db.Query(r.Context(), `
			select o.id, o.name, o.slug, o.logo_url, o.created_by, o.created_at
			from public.organisations o
			join public.organisation_members om
    			on om.organisation_id = o.id
			where om.user_id = $1
			order by o.created_at desc;
		`, userID)
		if err != nil {
			log.Printf("FETCH ORGS db error: %v", err)
			util.ErrorResponse(w, http.StatusInternalServerError, "db error")
			return
		}

		// Close db rows after responding to client.
		defer rows.Close()

		// Append results from database query into array of organisations.
		var orgArr []models.Organisation
		for rows.Next() {
			var org models.Organisation
			if err := rows.Scan(&org.ID, &org.Name, &org.Slug, &org.LogoURL, &org.CreatedBy, &org.CreatedAt); err != nil {
				log.Printf("FETCH ORGS error: %v", err)
				util.ErrorResponse(w, http.StatusInternalServerError, "db error")
				return
			}
			orgArr = append(orgArr, org)
		}

		// Send organisations to client.
		util.JSONResponse(w, http.StatusOK, orgArr)
	}
}

// Returns a list of all members in a given organisation.
func handleFetchOrganisationMembers(db *pgxpool.Pool) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Get user ID of authenticated user, provided by middleware.
		userID := r.Context().Value(auth.UserIDKey).(string)

		// Get organisation id from request URL
		orgID := r.PathValue("orgID")
		if orgID == "" {
			util.ErrorResponse(w, http.StatusBadRequest, "orgID is required")
			return
		}

		// Query database for members of this organisation.
		// $1 - Organisation's ID
		rows, err := db.Query(r.Context(), `
			SELECT
			om.user_id::text,
			om.role,
			om.created_at as joined_at,
			up.first_name,
			up.last_name,
			up.avatar_url,
			up.country
			FROM organisation_members om
			JOIN user_profiles up ON up.id = om.user_id
			WHERE om.organisation_id = $1
			ORDER BY lower(coalesce(up.last_name, '')), lower(coalesce(up.first_name, ''))
    	`, orgID)
		if err != nil {
			util.ErrorResponse(w, http.StatusInternalServerError, "error fetching organisation members")
			return
		}

		// Close db rows after responding to client.
		defer rows.Close()

		// Append results from database query into array of members.
		var memberArr []models.OrganisationMemberDTO
		for rows.Next() {
			var (
				userID    string
				role      string
				joinedAt  time.Time
				firstName string
				lastName  string
				avatarURL string
				country   string
			)

			if err := rows.Scan(&userID, &role, &joinedAt, &firstName, &lastName, &avatarURL, &country); err != nil {
				util.ErrorResponse(w, http.StatusInternalServerError, "error reading organisation members")
				return
			}

			memberArr = append(memberArr, models.OrganisationMemberDTO{
				User: models.UserProfile{
					ID:        userID,
					FirstName: firstName,
					LastName:  lastName,
					AvatarURL: avatarURL,
					Country:   country,
				},
				Role:     role,
				JoinedAt: joinedAt,
			})
		}

		// Check authenticated user belongs to this organisation members array
		for _, m := range memberArr {
			if m.User.ID == userID {
				// Send members to client.
				util.JSONResponse(w, http.StatusOK, memberArr)
				return
			}
		}

		// Return error to client, unauthorized access to this organisation
		util.ErrorResponse(w, http.StatusForbidden, "You don't have access to this organisation")
	}
}

// Creates a new organisation, owned by the authenicated user, and returns the organisation.
func handleCreateOrganisation(db *pgxpool.Pool) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Get user ID of authenticated user, provided by middleware.
		userID := r.Context().Value(auth.UserIDKey).(string)

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

		// Create slug
		// TODO: Ensure slug is truly unique
		slug, slugErr := util.CreateSlug(body.Name)
		if slugErr != nil {
			util.ErrorResponse(w, http.StatusInternalServerError, "error creating organisation")
			return
		}

		// Insert new organisation into db and return the inserted row.
		// $1 - Organisation name
		// $2 - Organisation Slug
		// $3 - Organisation Logo URL (optional)
		// $4 - Authenticated User's ID
		var org models.Organisation
		err := db.QueryRow(r.Context(), `
			INSERT INTO public.organisations (name, slug, logo_url, created_by)
			VALUES ($1, $2, $3, $4)
			RETURNING id, name, slug, logo_url, created_by, created_at
		`, body.Name, slug, body.LogoURL, userID).Scan(
			&org.ID, &org.Name, &org.Slug, &org.LogoURL, &org.CreatedBy, &org.CreatedAt,
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

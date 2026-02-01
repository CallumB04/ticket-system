package api

import (
	"net/http"

	"github.com/jackc/pgx/v5/pgxpool"
)

// Register handlers to REST api routes.
func RegisterHandlers(db *pgxpool.Pool) *http.ServeMux {
	// Create multiplexer
	mux := http.NewServeMux()

	// --- v1 ---
	v1 := http.NewServeMux()
	v1.Handle("GET /", handleRoot())

	// Organisations
	v1.Handle("GET /organisations", RequireAuth(handleFetchOrganisations(db)))
	v1.Handle("POST /organisations", RequireAuth(handleCreateOrganisation(db)))

	// Mount v1 routes under /v1 prefix
	mux.Handle("/v1/", http.StripPrefix("/v1", v1))

	return mux
}

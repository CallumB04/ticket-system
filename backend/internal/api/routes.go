package api

import "net/http"

// Register handlers to REST api routes.
func RegisterHandlers() *http.ServeMux {
	// Create multiplexer
	mux := http.NewServeMux()

	// --- v1 ---
	v1 := http.NewServeMux()
	v1.Handle("GET /", handleRoot())

	// Mount v1 routes under /v1 prefix
	mux.Handle("/v1/", http.StripPrefix("/v1", v1))

	return mux
}

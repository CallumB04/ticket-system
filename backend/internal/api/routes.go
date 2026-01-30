package api

import "net/http"

// Register handlers to REST api routes.
func RegisterHandlers() *http.ServeMux {
	// Create multiplexer
	mux := http.NewServeMux()

	// Root
	mux.Handle("GET /", handleRoot())

	return mux
}

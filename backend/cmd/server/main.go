package main

import (
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/CallumB04/ticket-system/backend/internal/api"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/joho/godotenv"
	"github.com/rs/cors"
)

func main() {
	// Create multiplexer and register router handlers.
	mux := api.RegisterHandlers()

	// Load environment variables file
	if err := godotenv.Load(); err != nil {
		log.Println("Failed to load .env file")
	}

	// Get frontendURLs from environment.
	// If empty, default to localhost with common Vite port.
	frontendURLs := strings.Split(os.Getenv("FRONTEND_URLS"), ",")
	if len(frontendURLs) == 0 {
		frontendURLs = []string{"http://localhost:5173"}
	}

	// Wrapping mux with middleware
	var handler http.Handler = mux
	handler = middleware.Logger(mux)        // logging
	handler = middleware.Recoverer(handler) // recover from panics and return 500 to client

	// Configure CORS
	c := cors.New(cors.Options{
		AllowedOrigins:   frontendURLs,
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE"},
		AllowedHeaders:   []string{"Content-Type"},
		AllowCredentials: true,
	})

	// Apply CORS specification to requests
	handler = c.Handler(handler)

	// Start server
	log.Println("Server is online")
	http.ListenAndServe(":8080", handler)
}

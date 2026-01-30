package main

import (
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/CallumB04/ticket-system/backend/internal/api"
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

	// Configure CORS
	c := cors.New(cors.Options{
		AllowedOrigins:   frontendURLs,
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE"},
		AllowedHeaders:   []string{"Content-Type"},
		AllowCredentials: true,
	})

	// Apply CORS specification to requests
	handler := c.Handler(mux)

	// Start server
	log.Println("Server is online")
	http.ListenAndServe(":8080", handler)
}

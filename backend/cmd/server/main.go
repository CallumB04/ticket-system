package main

import (
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/CallumB04/ticket-system/backend/internal/api"
	"github.com/CallumB04/ticket-system/backend/internal/db"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/joho/godotenv"
	"github.com/rs/cors"
)

func main() {
	// Load environment variables file.
	if err := godotenv.Load(); err != nil {
		log.Println("Failed to load .env file")
	}

	// Create connection pool to database.
	dbPool := db.InitDB()
	defer dbPool.Close() // close db connection when server closes

	// Create multiplexer and register router handlers.
	mux := api.RegisterHandlers(dbPool)

	// Get frontendURLs from environment.
	// If empty, default to localhost with common Vite port.
	frontendURLs := strings.Split(os.Getenv("FRONTEND_URLS"), ",")
	if len(frontendURLs) == 0 || (len(frontendURLs) == 1 && frontendURLs[0] == "") {
		frontendURLs = []string{"http://localhost:5173"}
	}

	// Wrapping mux with middleware.
	var handler http.Handler = mux
	handler = middleware.Logger(handler)    // logging
	handler = middleware.Recoverer(handler) // recover from panics and return 500 to client

	c := cors.New(cors.Options{
		AllowedOrigins:   frontendURLs,
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
	})

	// Apply CORS specification to requests.
	handler = c.Handler(handler)

	// Get port from environment or default to 8080.
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// Start server.
	log.Println("Server is online on port", port)
	log.Fatal(http.ListenAndServe(":"+port, handler))
}

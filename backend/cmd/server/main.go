package main

import (
	"fmt"
	"net/http"

	"github.com/CallumB04/ticket-system/backend/internal/api"
)

func main() {
	// Create multiplexer and register router handlers.
	mux := api.RegisterHandlers()

	// Start server
	fmt.Println("Server is online")
	http.ListenAndServe(":8080", mux)
}

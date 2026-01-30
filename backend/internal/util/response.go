package util

import (
	"encoding/json"
	"net/http"
)

// Send JSON response to client.
func JSONResponse(w http.ResponseWriter, status int, data any) {
	w.Header().Set("Content-type", "application/json")
	w.WriteHeader(status) // Set response status code

	// Send response to client.
	_ = json.NewEncoder(w).Encode(data)
}

// Send simple message response to client.
func MessageResponse(w http.ResponseWriter, status int, message string) {
	messageData := map[string]string{"message": message}
	JSONResponse(w, status, messageData)
}

// Send error message response to client.
func ErrorResponse(w http.ResponseWriter, status int, message string) {
	messageData := map[string]string{"error": message}
	JSONResponse(w, status, messageData)
}

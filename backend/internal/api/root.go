package api

import (
	"net/http"

	"github.com/CallumB04/ticket-system/backend/internal/util"
)

func handleRoot() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		util.MessageResponse(w, http.StatusOK, "Server is online")
	}
}

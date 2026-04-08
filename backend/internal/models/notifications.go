package models

import "time"

type Notification struct {
	ID          string    `json:"id"`
	Type        string    `json:"type"` // "welcome", "org-invite", etc
	Description string    `json:"description"`
	Read        bool      `json:"read"`
	Archived    bool      `json:"archived"`
	CreatedAt   time.Time `json:"created_at"`
}

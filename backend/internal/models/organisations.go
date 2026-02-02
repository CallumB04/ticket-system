package models

import "time"

// Database Models

type Organisation struct {
	ID        string    `json:"id"`
	Name      string    `json:"name"`
	Slug      string    `json:"slug"`
	LogoURL   *string   `json:"logo_url"`
	CreatedBy string    `json:"created_by"` // organisation owner
	CreatedAt time.Time `json:"created_at"`
}

type OrganisationMember struct {
	OrganisationID string    `json:"organisation_id"`
	UserID         string    `json:"user_id"`
	Role           string    `json:"role"`       // owner / admin / member
	InvitedBy      string    `json:"invited_by"` // user id
	CreatedAt      time.Time `json:"created_at"`
}

// Data Transfer Objects (for sending data to frontend)

type OrganisationMemberDTO struct {
	User     UserProfile `json:"user"`
	Role     string      `json:"role"`
	JoinedAt time.Time   `json:"joined_at"` // created_at within db
}

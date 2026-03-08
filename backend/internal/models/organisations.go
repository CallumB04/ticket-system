package models

import "time"

// Database Models

type Organisation struct {
	ID        string    `json:"id"`
	Name      string    `json:"name"`
	Slug      string    `json:"slug"`
	LogoURL   string    `json:"logo_url"`
	CreatedBy string    `json:"created_by"` // organisation owner
	CreatedAt time.Time `json:"created_at"`
}

type OrganisationRole string

const (
	RoleOwner  OrganisationRole = "owner"
	RoleAdmin  OrganisationRole = "admin"
	RoleMember OrganisationRole = "member"
)

type OrganisationMember struct {
	OrganisationID string           `json:"organisation_id"`
	UserID         string           `json:"user_id"`
	Role           OrganisationRole `json:"role"`       // owner / admin / member
	InvitedBy      string           `json:"invited_by"` // user id
	CreatedAt      time.Time        `json:"created_at"`
}

// Data Transfer Objects (for sending data to frontend)

type OrganisationMemberDTO struct {
	User     UserProfile `json:"user"`
	Role     string      `json:"role"`
	JoinedAt time.Time   `json:"joined_at"` // created_at within db
}

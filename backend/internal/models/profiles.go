package models

import "time"

// Database Models

type UserProfile struct {
	ID        string    `json:"id"`
	FirstName *string   `json:"first_name,omitempty"`
	LastName  *string   `json:"last_name,omitempty"`
	AvatarURL *string   `json:"avatar_url,omitempty"`
	CreatedAt time.Time `json:"created_at"`
}

// Methods

func (up *UserProfile) GetFullName() string {

	// missing both names
	if up.FirstName == nil && up.LastName == nil {
		return ""
	}

	// missing first name
	if up.FirstName == nil && up.LastName != nil {
		return *up.LastName
	}

	// missing last name
	if up.FirstName != nil && up.LastName == nil {
		return *up.FirstName
	}

	// both names present
	return *up.FirstName + " " + *up.LastName
}

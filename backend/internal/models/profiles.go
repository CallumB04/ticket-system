package models

import "time"

// Database Models

type UserProfile struct {
	ID        string    `json:"id"`
	FirstName string    `json:"first_name"`
	LastName  string    `json:"last_name"`
	AvatarURL string    `json:"avatar_url"`
	Country   string    `json:"country"`
	CreatedAt time.Time `json:"created_at"`
}

// Methods

func (up *UserProfile) GetFullName() string {

	// missing both names
	if up.FirstName == "" && up.LastName == "" {
		return ""
	}

	// missing first name
	if up.FirstName == "" && up.LastName != "" {
		return up.LastName
	}

	// missing last name
	if up.FirstName != "" && up.LastName == "" {
		return up.FirstName
	}

	// both names present
	return up.FirstName + " " + up.LastName
}

package models

import (
	"testing"
	"time"
)

func TestGetFullName(t *testing.T) {
	// Setup Tests
	firstName := "Callum"
	lastName := "Burgoyne"

	tests := []struct {
		name        string
		userProfile UserProfile
		expected    string
	}{
		{
			name: "existing first and last name",
			userProfile: UserProfile{
				ID:        "1",
				FirstName: &firstName,
				LastName:  &lastName,
				CreatedAt: time.Now(),
			},
			expected: "Callum Burgoyne",
		}, {
			name: "missing first name",
			userProfile: UserProfile{
				ID:        "2",
				LastName:  &lastName,
				CreatedAt: time.Now(),
			},
			expected: "Burgoyne",
		}, {
			name: "missing last name",
			userProfile: UserProfile{
				ID:        "3",
				FirstName: &firstName,
				CreatedAt: time.Now(),
			},
			expected: "Callum",
		}, {
			name: "missing both names",
			userProfile: UserProfile{
				ID:        "4",
				CreatedAt: time.Now(),
			},
			expected: "",
		},
	}

	// Execute Tests
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if result := tt.userProfile.GetFullName(); result != tt.expected {
				t.Errorf("incorrect value. expected %s, got %s", tt.expected, result)
			}

		})
	}
}

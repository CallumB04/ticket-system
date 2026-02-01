package api

import "testing"

func TestGetTokenFromHeader(t *testing.T) {
	// Setup tests
	tests := []struct {
		name     string
		value    string
		expected string
	}{
		{"empty string", "", ""},
		{"whitespace", " ", ""},
		{"newline character", "\n", ""},
		{"missing bearer", "123123123123", ""},
		{"capitalized bearer without token", "Bearer", ""},
		{"capitalized bearer with token", "Bearer 123234123", "123234123"},
		{"lowercase bearer without token", "bearer", ""},
		{"lowercase bearer with token", "bearer 123234123", "123234123"},
	}

	// Execute tests
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if result := getTokenFromHeader(tt.value); result != tt.expected {
				t.Errorf("incorrect value. expected %s, got %s", tt.expected, result)
			}
		})
	}

}

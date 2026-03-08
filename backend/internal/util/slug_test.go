package util

import (
	"testing"
)

func TestCreateSlug(t *testing.T) {
	// Setup tests
	tests := []struct {
		name        string
		input       string
		expectedVal string
		expectedErr error
	}{
		{"empty string", "", "", ErrEmptyInput},
		{"single space", " ", "", ErrEmptyInput},
		{"whitespace", "    ", "", ErrEmptyInput},
		{"single word", "test", "test", nil},
		{"single word with leading whitespace", " test", "test", nil},
		{"single word with trailing whitespace", "test ", "test", nil},
		{"two words", "test name", "test-name", nil},
		{"two words uppercase", "TEST NAME", "test-name", nil},
		{"two words capitalized words", "Test Name", "test-name", nil},
		{"three words", "another test name", "another-test-name", nil},
		{"three words capitalized", "Another Test Name", "another-test-name", nil},
		{"three words random caps", "aNoTHer tEst NaMe", "another-test-name", nil},
	}

	// Execute tests
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result, err := CreateSlug(tt.input)

			if result != tt.expectedVal {
				t.Errorf("incorrect value. expected %s, got %s", tt.expectedVal, result)
			} else if err != tt.expectedErr {
				if tt.expectedErr == nil {
					t.Errorf("unexpected error. %s", err)
				} else {
					t.Errorf("incorrect error. expected %s, got %s", tt.expectedErr, err)
				}
			}
		})
	}
}

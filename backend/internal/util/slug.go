package util

import (
	"errors"
	"regexp"
	"strings"
)

var (
	ErrEmptyInput = errors.New("cannot create slug from empty string")
)

func CreateSlug(input string) (string, error) {
	// remove leading and trailing whitespace
	trimmed := strings.TrimSpace(input)
	if trimmed == "" {
		return "", ErrEmptyInput
	}

	// convert to lowercase
	lowercase := strings.ToLower(trimmed)

	// replace all whitespace with hyphen using regex
	re := regexp.MustCompile(`\s+`)
	slug := re.ReplaceAllString(lowercase, "-")

	return slug, nil
}

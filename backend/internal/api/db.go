package api

import (
	"context"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
)

// Initializes a connection pool to the PostgreSQL database.
func InitDB() *pgxpool.Pool {
	// Get database URL from environment, panic if doesnt exist.
	dbURL := os.Getenv("DATABASE_URL")
	if dbURL == "" {
		panic("DATABASE_URL is required")
	}

	// Create a new connection pool to the database.
	pool, err := pgxpool.New(context.Background(), dbURL)
	if err != nil {
		panic(err)
	}

	return pool
}

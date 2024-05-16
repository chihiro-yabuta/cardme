package post

import (
	"context"
	"github.com/redis/go-redis/v9"
)

type Data struct {
	key string
	svg string
	Ctx context.Context
	Rdb *redis.Client
}
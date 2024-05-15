package get

import (
	"context"
	"strings"
	"github.com/gin-gonic/gin"
	"github.com/redis/go-redis/v9"
)

func (d *Data) Run(c *gin.Context) {
	d.getSvg(c)
	c.Writer.Header().Set("Content-Type", "image/svg+xml")
	c.Writer.Write([]byte(d.svg))
}

func (d *Data) getSvg(c *gin.Context) {
	d.key = strings.ReplaceAll(c.DefaultQuery("key", ""),  " ", "+")
	d.redis()
	d.decode()
}

func (d *Data) redis() {
	var ctx = context.Background()
	rdb := redis.NewClient(&redis.Options{
		Addr: "localhost:6379",
	})
	d.svg, _ = rdb.Get(ctx, d.key).Result()
}
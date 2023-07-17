package post

import (
	"context"
	"strings"
	"encoding/hex"
	"crypto/sha256"
	"github.com/gin-gonic/gin"
	"github.com/redis/go-redis/v9"
)

func (d *Data) Run(c *gin.Context) {
	d.getSvg(c)
	d.getHash()
	d.redis()
	c.JSON(200, gin.H{ "key": d.key })
}

func (d *Data) getSvg(c *gin.Context) {
	svg := strings.ReplaceAll(c.PostForm("svg"),  " ", "+")
	d.encode(svg)
}

func (d *Data) getHash() {
	hash := sha256.Sum256([]byte(d.svg))
	d.key = hex.EncodeToString(hash[:])
}

func (d *Data) redis() {
	var ctx = context.Background()
	rdb := redis.NewClient(&redis.Options{
		Addr: "localhost:6379",
	})
	rdb.Set(ctx, d.key, d.svg, 0)
}
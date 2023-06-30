package post

import (
	"context"
	"strings"
	"math/rand"
	"github.com/gin-gonic/gin"
	"github.com/redis/go-redis/v9"
)

func (d *Data) Run(c *gin.Context) {
	d.getSvg(c)
	d.getRand()
	d.redis()
	c.JSON(200, gin.H{ "key": d.key })
}

func (d *Data) getSvg(c *gin.Context) {
	svg := strings.ReplaceAll(c.PostForm("svg"),  " ", "+")
	d.encode(svg)
}

func (d *Data) getRand() {
	for i := 0; i < 100; i++ {
		d.key += string(d.svg[rand.Intn(len(d.svg))])
	}
}

func (d *Data) redis() {
	var ctx = context.Background()
	rdb := redis.NewClient(&redis.Options{
		Addr: "localhost:6379",
	})
	rdb.Set(ctx, d.key, d.svg, 0)
}
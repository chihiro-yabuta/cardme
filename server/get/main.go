package get

import (
	"context"
	"github.com/gin-gonic/gin"
	"github.com/redis/go-redis/v9"
	"github.com/google/go-github/v48/github"
)

func (d *Data) Run(c *gin.Context) {
	d.getData(c)
	d.getSvg(c)
	c.Writer.Header().Set("Content-Type", "image/svg+xml")
	c.Writer.Write([]byte(d.gitReplace()))
}

func (d *Data) getData(c *gin.Context) {
	name := c.DefaultQuery("name", "Google")
	user := github.NewClient(nil).Users
	uResp, _, _ := user.Get(context.Background(), name)
	d.user.setUser(uResp)
}

func (d *Data) getSvg(c *gin.Context) {
	d.key = c.DefaultQuery("key", "")
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
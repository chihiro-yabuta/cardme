package get

import (
	"context"
	"strings"
	"github.com/gin-gonic/gin"
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
	d.usr.setUser(uResp)
}

func (d *Data) getSvg(c *gin.Context) {
	d.key = strings.ReplaceAll(c.DefaultQuery("key", ""),  " ", "+")
	d.svg, _ = d.Rdb.Get(d.Ctx, d.key).Result()
	d.decode()
}
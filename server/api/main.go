package api

import (
	"context"
	"strings"
	"github.com/google/go-github/v48/github"
	"github.com/gin-gonic/gin"
)

func (d *Data) Get(c *gin.Context) {
	d.GetData(c)
	d.GetSvg(c)
	mode := c.DefaultQuery("mode", "")
	if mode == "html" && d.Svg.DecSvg != "" {
		c.Writer.Header().Set("Content-Type", "image/svg+xml")
		c.Writer.Write([]byte(GitReplace(d.Svg.DecSvg)))
	} else {
		c.JSON(200, d)
	}
}

func (d *Data) GetData(c *gin.Context) {
	name := c.DefaultQuery("name", "Google")
	user := github.NewClient(nil).Users
	uResp, _, _ := user.Get(context.Background(), name)
	d.User.SetUser(uResp)
}

func (d *Data) GetSvg(c *gin.Context) {
	svg := strings.ReplaceAll(c.DefaultQuery("raw", ""),  " ", "+")
	d.Svg.Encode(svg)
	src := strings.ReplaceAll(c.DefaultQuery("src", ""),  " ", "+")
	d.Svg.Decode(src)
}
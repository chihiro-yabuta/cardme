package get

import (
	"context"
	"strings"
	"github.com/gin-gonic/gin"
)

func (d *Data) Run(c *gin.Context) {
	d.GetData(c)
	d.GetSvg(c)
	c.Writer.Header().Set("Content-Type", "image/svg+xml")
	c.Writer.Write([]byte(d.GitReplace()))
}

func (d *Data) GetData(c *gin.Context) {
	name := c.DefaultQuery("name", "Google")
	user := github.NewClient(nil).Users
	uResp, _, _ := user.Get(context.Background(), name)
	d.User.SetUser(uResp)
}

func (d *Data) GetSvg(c *gin.Context) {
	svg := strings.ReplaceAll(c.PostForm("svg"),  " ", "+")
	d.Decode(svg)
}
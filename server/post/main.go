package post

import (
	"context"
	"strings"
	"github.com/google/go-github/v48/github"
	"github.com/gin-gonic/gin"
)

func (d *Data) Run(c *gin.Context) {
	d.GetSvg(c)
}

func (d *Data) GetSvg(c *gin.Context) {
	svg := strings.ReplaceAll(c.PostForm("svg"),  " ", "+")
	d.Encode(svg)
}
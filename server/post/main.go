package post

import (
	"context"
	"strings"
	"math/rand"
	"github.com/google/go-github/v48/github"
	"github.com/gin-gonic/gin"
)

func (d *Data) Run(c *gin.Context) {
	d.GetSvg(c)
	d.GetRand()
	c.JSON(200, { key: d.Key })
}

func (d *Data) GetSvg(c *gin.Context) {
	svg := strings.ReplaceAll(c.PostForm("svg"),  " ", "+")
	d.Encode(svg)
}

func (d *Data) GetRand() {
	b := make([]byte, 100)
	rand.Read(b)
  for _, v := range b { d.Key += string(d[int(v)%len(d)]) }
}
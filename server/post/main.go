package post

import (
	"strings"
	"math/rand"
	"github.com/gin-gonic/gin"
)

func (d *Data) Run(c *gin.Context) {
	d.GetSvg(c)
	d.GetRand()
	c.JSON(200, gin.H{ "key": d.Key })
}

func (d *Data) GetSvg(c *gin.Context) {
	svg := strings.ReplaceAll(c.PostForm("svg"),  " ", "+")
	d.Encode(svg)
}

func (d *Data) GetRand() {
	b := make([]byte, 100)
	rand.Read(b)
  for _, v := range b { d.Key += string(d.Key[int(v)%len(d.Key)]) }
}
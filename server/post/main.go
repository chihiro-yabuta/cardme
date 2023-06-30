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
	for i := 0; i < 100; i++ {
		d.Key += string(d.Svg[rand.Intn(len(d.Svg))])
	}
}
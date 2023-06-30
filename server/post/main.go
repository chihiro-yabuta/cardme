package post

import (
	"strings"
	"math/rand"
	"github.com/gin-gonic/gin"
)

func (d *Data) Run(c *gin.Context) {
	d.getSvg(c)
	d.getRand()
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
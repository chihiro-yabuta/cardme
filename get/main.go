package get

import (
	"strings"
	"github.com/gin-gonic/gin"
)

func (d *Data) Run(c *gin.Context) {
	d.getSvg(c)
	c.Writer.Header().Set("Content-Type", "image/svg+xml")
	c.Writer.Write([]byte(d.svg))
}

func (d *Data) getSvg(c *gin.Context) {
	d.key = strings.ReplaceAll(c.DefaultQuery("key", ""),  " ", "+")
	d.svg, _ = d.Rdb.Get(d.Ctx, d.key).Result()
	d.decode()
}
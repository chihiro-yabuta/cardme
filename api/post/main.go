package post

import (
	"strings"
	"encoding/hex"
	"crypto/sha256"
	"github.com/gin-gonic/gin"
)

func (d *Data) Run(c *gin.Context) {
	d.getSvg(c)
	d.getHash()
	d.Rdb.Set(d.Ctx, d.key, d.svg, 0)
	c.JSON(200, gin.H{ "key": d.key })
}

func (d *Data) getSvg(c *gin.Context) {
	svg := strings.ReplaceAll(c.PostForm("svg"),  " ", "+")
	d.encode(svg)
}

func (d *Data) getHash() {
	hash := sha256.Sum256([]byte(d.svg))
	d.key = hex.EncodeToString(hash[:])
}
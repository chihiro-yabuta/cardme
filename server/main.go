package main

import (
	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"
	"go/api"
)

func main() {
	d := new(api.Data)
	route := gin.Default()
	route.Use(cors.Default())
	route.Static("/assets", "public/assets")
	route.LoadHTMLGlob("public/*.html")
	route.GET("/", func(c *gin.Context) {
		c.HTML(200, "index.html", nil)
	})
	route.GET("/server", d.Get)
	route.Run()
}
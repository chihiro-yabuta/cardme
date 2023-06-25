package main

import (
	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"
	"go/api"
	"go/get"
	"go/post"
)

func main() {
	route := gin.Default()
	route.Use(cors.Default())

	route.Static("/assets", "public/assets")
	route.Static("/css", "public/css")
	route.Static("/js", "public/js")
	route.LoadHTMLGlob("public/*.html")
	route.GET("/", func(c *gin.Context) { c.HTML(200, "index.html", nil) })

	a := new(api.User)
	g := new(get.Data)
	p := new(post.Data)

	route.GET("/api", a.Run)
	route.POST("/post", g.Run)
	route.GET("/get", p.Run)
	route.Run()
}
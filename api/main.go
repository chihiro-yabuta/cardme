package main

import (
	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"
	"server/api/user"
	"server/api/get"
	"server/api/post"
)

func main() {
	route := gin.Default()
	route.Use(cors.Default())

	route.Static("/assets", "public/assets")
	route.Static("/css", "public/css")
	route.Static("/js", "public/js")
	route.LoadHTMLGlob("public/index.html")
	route.GET("/", func(c *gin.Context) { c.HTML(200, "index.html", nil) })

	a := new(user.User)
	p := new(post.Data)
	g := new(get.Data)

	route.GET("/user", a.Run)
	route.POST("/post", p.Run)
	route.GET("/get", g.Run)
	route.Run()
}
package main

import (
	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"
	"go/post"
)

func main() {
	d := new(post.Data)
	route := gin.Default()
	route.Use(cors.Default())
	route.GET("/", d.Post)
	route.Run()
}
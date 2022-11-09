package main

import (
	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"
	"go/api"
)

func main() {
	user := new(api.User)

	route := gin.Default()
	route.Use(cors.Default())
	route.GET("/", user.GetGitApi)
	route.Run()
}
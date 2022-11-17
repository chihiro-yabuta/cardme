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
	route.GET("/", d.Get)
	route.Run()
}
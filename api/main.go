package main

import (
	"os"
	"context"
	"crypto/tls"
	"github.com/joho/godotenv"
	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"
	"github.com/redis/go-redis/v9"
	"server/api/user"
	"server/api/get"
	"server/api/post"
)

func main() {
	godotenv.Load(".env")
	ctx := context.Background()
	rdb := redis.NewClient(&redis.Options{
		Addr: os.Getenv("host"),
		Password: os.Getenv("pswd"),
		TLSConfig: &tls.Config{
			MinVersion: tls.VersionTLS12,
		},
	})

	route := gin.Default()
	route.Use(cors.Default())

	route.StaticFile("/cardme.png", "public/cardme.png")
	route.StaticFile("/index.css", "public/index.css")
	route.StaticFile("/index.js", "public/index.js")
	route.LoadHTMLFiles("public/index.html")
	route.GET("/", func(c *gin.Context) { c.HTML(200, "index.html", nil) })

	a := new(user.User)
	p := post.Data{ Ctx: ctx, Rdb: rdb }
	g := get.Data{ Ctx: ctx, Rdb: rdb }

	route.GET("/user", a.Run)
	route.POST("/post", p.Run)
	route.GET("/get", g.Run)
	route.Run()
}
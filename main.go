package main

import (
	"os"
	"context"
	"github.com/joho/godotenv"
	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"
	"github.com/redis/go-redis/v9"
	"github.com/chihiro-yabuta/cardme/user"
	"github.com/chihiro-yabuta/cardme/get"
	"github.com/chihiro-yabuta/cardme/post"
)

func main() {
	godotenv.Load(".env")
	ctx := context.Background()
	opt, _ := redis.ParseURL(os.Getenv("host"))
	rdb := redis.NewClient(opt)

	route := gin.Default()
	route.Use(cors.Default())

	route.StaticFile("/cardme.png", "public/cardme.png")
	route.StaticFile("/index.css", "public/index.css")
	route.StaticFile("/index.js", "public/index.js")
	route.LoadHTMLFiles("public/index.html")
	route.GET("/", func(c *gin.Context) { c.HTML(200, "index.html", nil) })

	u := new(user.User)
	p := post.Data{ Ctx: ctx, Rdb: rdb }
	g := get.Data{ Ctx: ctx, Rdb: rdb }

	route.GET("/user", u.Run)
	route.POST("/post", p.Run)
	route.GET("/get", g.Run)
	route.Run()
}
package api

import (
	"os"
	"context"
	"net/http"
	"crypto/tls"
	"github.com/joho/godotenv"
	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"
	"github.com/redis/go-redis/v9"
	"github.com/chihiro-yabuta/cardme/user"
	"github.com/chihiro-yabuta/cardme/get"
	"github.com/chihiro-yabuta/cardme/post"
)

var route *gin.Engine

func init() {
	godotenv.Load(".env")
	ctx := context.Background()
	rdb := redis.NewClient(&redis.Options{
		Addr: os.Getenv("host"),
		Password: os.Getenv("pswd"),
		TLSConfig: &tls.Config{
			MinVersion: tls.VersionTLS12,
		},
	})

	route = gin.Default()
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
}

func Handler(w http.ResponseWriter, r *http.Request) {
	route.ServeHTTP(w, r)
}
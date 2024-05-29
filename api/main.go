package handler

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

	u := new(user.User)
	p := post.Data{ Ctx: ctx, Rdb: rdb }
	g := get.Data{ Ctx: ctx, Rdb: rdb }

	route.GET("/user", u.Run)
	route.POST("/post", p.Run)
	route.GET("/get", g.Run)
}

func Handler(w http.ResponseWriter, r *http.Request) {
	route.ServeHTTP(w, r)
}
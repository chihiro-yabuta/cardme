package api

import (
	"context"
	"github.com/gin-gonic/gin"
	"github.com/google/go-github/v48/github"
)

func (u *User) Run(c *gin.Context) {
	u.getData(c)
	c.JSON(200, u)
}

func (u *User) getData(c *gin.Context) {
	name := c.DefaultQuery("name", "Google")
	user := github.NewClient(nil).Users
	uResp, _, _ := user.Get(context.Background(), name)
	u.setUser(uResp)
}
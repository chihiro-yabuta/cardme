package api

import (
	"context"
	"strings"
	"github.com/google/go-github/v48/github"
	"github.com/gin-gonic/gin"
)

func (u *User) Run(c *gin.Context) {
	u.GetData(c)
	c.JSON(200, u)
}

func (u *Data) GetData(c *gin.Context) {
	name := c.DefaultQuery("name", "Google")
	user := github.NewClient(nil).Users
	uResp, _, _ := user.Get(context.Background(), name)
	u.SetUser(uResp)
}
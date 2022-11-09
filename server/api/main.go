package api

import (
	"context"
	"github.com/google/go-github/v48/github"
	"github.com/gin-gonic/gin"
)

func (u *User) GetGitApi(c *gin.Context) {
	name := c.DefaultQuery("name", "Google")
	user := github.NewClient(nil).Users
	uResp, _, _ := user.Get(context.Background(), name)

	u.SetData(name, uResp)
	c.JSON(200, u)
}
package api

import (
	"github.com/google/go-github/v48/github"
	"github.com/jinzhu/copier"
)

type User struct {
	Name string
	Followers int
	ReposNum int
}

func (u *User) SetData(name string, uResp *github.User) {
	uc := User {
		Name: name,
		Followers: uResp.GetFollowers(),
		ReposNum: uResp.GetPublicRepos(),
	}
	copier.Copy(&u, &uc)
}
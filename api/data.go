package api

import (
	"github.com/google/go-github/v48/github"
)

type User struct {
	Login                   string
	ID                      int64
	NodeID                  string
	AvatarURL               string
	HTMLURL                 string
	GravatarID              string
	Name                    string
	Company                 string
	Blog                    string
	Location                string
	Email                   string
	Hireable                bool
	Bio                     string
	TwitterUsername         string
	PublicRepos             int
	PublicGists             int
	Followers               int
	Following               int
	CreatedAt               github.Timestamp
	UpdatedAt               github.Timestamp
	SuspendedAt             github.Timestamp
	Type                    string
	SiteAdmin               bool
	TotalPrivateRepos       int
	OwnedPrivateRepos       int
	PrivateGists            int
	DiskUsage               int
	Collaborators           int
	TwoFactorAuthentication bool
	Plan                    *github.Plan
	LdapDn                  string

	URL                     string
	EventsURL               string
	FollowingURL            string
	FollowersURL            string
	GistsURL                string
	OrganizationsURL        string
	ReceivedEventsURL       string
	ReposURL                string
	StarredURL              string
	SubscriptionsURL        string

	TextMatches             []*github.TextMatch

	Permissions             map[string]bool
	RoleName                string
}
package get

import (
	"bytes"
	"strings"
	"compress/flate"
	"encoding/base64"
	"github.com/jinzhu/copier"
	"github.com/google/go-github/v48/github"
)

func rm (s string) string { return strings.Split(s, "{")[0] }
func (u *user) setUser(uResp *github.User) {
	uc := user {
		Login                   :rm(uResp.GetLogin()),
		ID                      :uResp.GetID(),
		NodeID                  :rm(uResp.GetNodeID()),
		AvatarURL               :rm(uResp.GetAvatarURL()),
		HTMLURL                 :rm(uResp.GetHTMLURL()),
		GravatarID              :rm(uResp.GetGravatarID()),
		Name                    :rm(uResp.GetName()),
		Company                 :rm(uResp.GetCompany()),
		Blog                    :rm(uResp.GetBlog()),
		Location                :rm(uResp.GetLocation()),
		Email                   :rm(uResp.GetEmail()),
		Hireable                :uResp.GetHireable(),
		Bio                     :rm(uResp.GetBio()),
		TwitterUsername         :rm(uResp.GetTwitterUsername()),
		PublicRepos             :uResp.GetPublicRepos(),
		PublicGists             :uResp.GetPublicGists(),
		Followers               :uResp.GetFollowers(),
		Following               :uResp.GetFollowing(),
		CreatedAt               :uResp.GetCreatedAt(),
		UpdatedAt               :uResp.GetUpdatedAt(),
		SuspendedAt             :uResp.GetSuspendedAt(),
		Type                    :rm(uResp.GetType()),
		SiteAdmin               :uResp.GetSiteAdmin(),
		TotalPrivateRepos       :uResp.GetTotalPrivateRepos(),
		OwnedPrivateRepos       :uResp.GetOwnedPrivateRepos(),
		PrivateGists            :uResp.GetPrivateGists(),
		DiskUsage               :uResp.GetDiskUsage(),
		Collaborators           :uResp.GetCollaborators(),
		TwoFactorAuthentication :uResp.GetTwoFactorAuthentication(),
		Plan                    :uResp.GetPlan(),
		LdapDn                  :rm(uResp.GetLdapDn()),

		URL                     :rm(uResp.GetURL()),
		EventsURL               :rm(uResp.GetEventsURL()),
		FollowingURL            :rm(uResp.GetFollowingURL()),
		FollowersURL            :rm(uResp.GetFollowersURL()),
		GistsURL                :rm(uResp.GetGistsURL()),
		OrganizationsURL        :rm(uResp.GetOrganizationsURL()),
		ReceivedEventsURL       :rm(uResp.GetReceivedEventsURL()),
		ReposURL                :rm(uResp.GetReposURL()),
		StarredURL              :rm(uResp.GetStarredURL()),
		SubscriptionsURL        :rm(uResp.GetSubscriptionsURL()),

		TextMatches             :nil,

		Permissions             :uResp.GetPermissions(),
		RoleName                :rm(uResp.GetRoleName()),
	}
	copier.Copy(&u, &uc)
}

func (d *Data) decode() {
	base, _ := base64.StdEncoding.DecodeString(d.svg)
	var dec bytes.Buffer
	r := flate.NewReader(bytes.NewReader(base))
	dec.ReadFrom(r)
	r.Close()
	d.svg = dec.String()
}
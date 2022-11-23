package api

import (
	"bytes"
	"strings"
	"compress/flate"
	"encoding/base64"
	"github.com/google/go-github/v48/github"
	"github.com/jinzhu/copier"
)

func rm (s string) string { return strings.Split(s, "{")[0] }
func (u *User) SetUser(uResp *github.User) {
	uc := User {
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

func (s *Svg) Encode(element string) {
	base, _ := base64.StdEncoding.DecodeString(element)
	var enc bytes.Buffer
	w, _ := flate.NewWriter(&enc, flate.BestCompression)
	w.Write(base)
	w.Close()
	s.EncSvg = base64.StdEncoding.EncodeToString(enc.Bytes())
}

func (s *Svg) Decode(element string) {
	base, _ := base64.StdEncoding.DecodeString(element)
	var dec bytes.Buffer
	r := flate.NewReader(bytes.NewReader(base))
	dec.ReadFrom(r)
	r.Close()
	s.DecSvg = dec.String()
}
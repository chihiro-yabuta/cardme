export interface User {
  Login?                   :string;
  ID?                      :number;
  NodeID?                  :string;
  AvatarURL?               :string;
  HTMLURL?                 :string;
  GravatarID?              :string;
  Name?                    :string;
  Company?                 :string;
  Blog?                    :string;
  Location?                :string;
  Email?                   :string;
  Hireable?                :boolean;
  Bio?                     :string;
  TwitterUsername?         :string;
  PublicRepos?             :number;
  PublicGists?             :number;
  Followers?               :number;
  Following?               :number;
  CreatedAt?               :string;
  UpdatedAt?               :string;
  SuspendedAt?             :string;
  Type?                    :string;
  SiteAdmin?               :boolean;
  TotalPrivateRepos?       :number;
  OwnedPrivateRepos?       :number;
  PrivateGists?            :number;
  DiskUsage?               :number;
  Collaborators?           :number;
  TwoFactorAuthentication? :boolean;
  Plan?                    :Plan;
  LdapDn?                  :string;

  URL?                     :string;
  EventsURL?               :string;
  FollowingURL?            :string;
  FollowersURL?            :string;
  GistsURL?                :string;
  OrganizationsURL?        :string;
  ReceivedEventsURL?       :string;
  ReposURL?                :string;
  StarredURL?              :string;
  SubscriptionsURL?        :string;

  TextMatches?             :null;

  Permissions?             :Object;
  RoleName?                :string;
}

interface Plan {
  Name          :string;
  Space         :number;
  Collaborators :number;
  PrivateRepos  :number;
  FilledSeats   :number;
  Seats         :number;
}

export const userMap = [
  'Login',
  'ID',
  'NodeID',
  'AvatarURL',
  'HTMLURL',
  'GravatarID',
  'Name',
  'Company',
  'Blog',
  'Location',
  'Email',
  'Hireable',
  'Bio',
  'TwitterUsername',
  'PublicRepos',
  'PublicGists',
  'Followers',
  'Following',
  'CreatedAt',
  'UpdatedAt',
  'SuspendedAt',
  'Type',
  'SiteAdmin',
  'TotalPrivateRepos',
  'OwnedPrivateRepos',
  'PrivateGists',
  'DiskUsage',
  'Collaborators',
  'TwoFactorAuthentication',
  'Plan',
  'LdapDn',
  'URL',
  'EventsURL',
  'FollowingURL',
  'FollowersURL',
  'GistsURL',
  'OrganizationsURL',
  'ReceivedEventsURL',
  'ReposURL',
  'StarredURL',
  'SubscriptionsURL',
  'TextMatches',
  'Permissions',
  'RoleName',
];
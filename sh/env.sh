#!/bin/sh

# create policies https://eksctl.io/usage/minimum-iam-policies/
# create user
# create Users > user > Access keys
# download csv

email=`git config user.email`
name=`git config user.name`

if [ "$name" == "chihiro.a.yabuta" ]; then
  echo "git_email=ja.chihiro.yabuta@gmail.com\ngit_name=chihiro-yabuta" > .env
else
  echo "git_email=${email}\ngit_name=${name}" > .env
fi

IFS=, read -ra parts <<< "$(sed -n '2p' accessKeys.csv)"
echo "access=${parts[0]}\nsecret=${parts[1]}" >> .env
#!/bin/sh

email=`git config user.email`
name=`git config user.name`

if [ "$name" == "chihiro.a.yabuta" ]; then
  echo "git_email=ja.chihiro.yabuta@gmail.com\ngit_name=chihiro-yabuta" > .env
else
  echo "git_email=${email}\ngit_name=${name}" > .env
fi
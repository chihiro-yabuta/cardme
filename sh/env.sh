#!/bin/sh

email=`git config user.email`
name=`git config user.name`

if [ ! -e '.env' ]; then
  if [ "$1" == "admin" ]; then
    echo "git_email=ja.chihiro.yabuta@gmail.com\ngit_name=chihiro-yabuta" > .env
  else
    echo "git_email=${email}\ngit_name=${name}" > .env
  fi

  read -p "redis host(empty -> localhost): " host
  if [ -z $host ]; then
    host='localhost:6379'
  else
    read -p "redis password: " pswd
    echo "pswd=${pswd}" >> .env
  fi
  echo "host=${host}" >> .env
fi
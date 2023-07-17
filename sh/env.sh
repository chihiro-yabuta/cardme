#!/bin/sh

email=`git config user.email`
name=`git config user.name`

if [ "$name" == "chihiro.a.yabuta" ]; then
  echo "git_email=ja.chihiro.yabuta@gmail.com\ngit_name=chihiro-yabuta" > .env
else
  echo "git_email=${email}\ngit_name=${name}" > .env
fi

if [ -e "accessKeys.csv" ]; then
  IFS=, read -ra parts <<< "$(sed -n '2p' accessKeys.csv)"
  echo cmd1=aws configure set aws_access_key_id ${parts[0]} >> .env
  echo cmd2=aws configure set aws_secret_access_key ${parts[1]} >> .env
  echo cmd3=aws configure set region ap-northeast-1 >> .env
  echo cmd4=eksctl utils write-kubeconfig --cluster=cardme-cluster >> .env
else
  echo cmd1=echo "no aws config" >> .env
  echo cmd2=echo "no aws config" >> .env
  echo cmd3=echo "no aws config" >> .env
  echo cmd4=echo "no aws config" >> .env
fi
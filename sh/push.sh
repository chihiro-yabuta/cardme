#!/bin/sh

comment=$(echo $1 | sed -e 's/-/ /g')
echo $comment
git add .
git commit -m "$comment"
git push
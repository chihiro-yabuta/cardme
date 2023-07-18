#!/bin/sh

sigs="kubernetes-sigs/aws-load-balancer-controller"
account_id=$(aws sts get-caller-identity | grep -oP '(?<=Account": ")[^"]+')
policy="AWSLoadBalancerControllerIAMPolicy"

if [ -n $(aws iam get-policy --policy-arn arn:aws:iam::${account_id}:policy/${policy}) ]; then
  curl -O https://raw.githubusercontent.com/${sigs}/v2.4.7/docs/install/iam_policy.json
  aws iam create-policy \
  --policy-name ${policy} \
  --policy-document file://iam_policy.json
  rm iam_policy.json
fi

eksctl create cluster -f k8s/cluster.yaml
eksctl utils associate-iam-oidc-provider --cluster cardme-cluster --approve

eksctl create iamserviceaccount \
--cluster=cardme-cluster \
--namespace=kube-system \
--name=aws-load-balancer-controller \
--attach-policy-arn=arn:aws:iam::${account_id}:policy/${policy} \
--override-existing-serviceaccounts \
--approve

kubectl apply \
--validate=false \
-f https://github.com/jetstack/cert-manager/releases/download/v1.5.4/cert-manager.yaml

sleep 10

curl -Lo v2_4_7_full.yaml https://github.com/${sigs}/releases/download/v2.4.7/v2_4_7_full.yaml
sed -i.bak -e '561,569d' ./v2_4_7_full.yaml
sed -i.bak -e 's|your-cluster-name|cardme-cluster|' ./v2_4_7_full.yaml
kubectl apply -f v2_4_7_full.yaml

curl -Lo v2_4_7_ingclass.yaml https://github.com/${sigs}/releases/download/v2.4.7/v2_4_7_ingclass.yaml
kubectl apply -f v2_4_7_ingclass.yaml

rm v2_4_7_full.yaml v2_4_7_full.yaml.bak v2_4_7_ingclass.yaml
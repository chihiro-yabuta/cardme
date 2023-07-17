#!/bin/sh

account_id=$(aws sts get-caller-identity | grep -oP '(?<=Account": ")[^"]+')
role="AmazonEKS_EBS_CSI_DriverRole"
policy="arn:aws:iam::aws:policy/service-role/AmazonEBSCSIDriverPolicy"
oidc=$(aws eks describe-cluster --name cardme-cluster --query "cluster.identity.oidc.issuer" --output text | sed s#https://##)
node=$(kubectl -n kube-system describe configmap aws-auth | awk '/rolearn:/ {print $2}' | sed 's|^.*/||')

cat <<EOF > trust-policy.json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::${account_id}:oidc-provider/${oidc}"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "${oidc}:aud": "sts.amazonaws.com",
          "${oidc}:sub": "system:serviceaccount:kube-system:ebs-csi-controller-sa"
        }
      }
    }
  ]
}
EOF

aws iam create-role --role-name ${role} --assume-role-policy-document file://"trust-policy.json"
aws iam attach-role-policy --policy-arn $policy --role-name $node
kubectl apply -k "github.com/kubernetes-sigs/aws-ebs-csi-driver/deploy/kubernetes/overlays/stable/?ref=master"

rm trust-policy.json
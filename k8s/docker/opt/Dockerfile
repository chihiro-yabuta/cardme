FROM rancher/eks-operator:v1.2.2-rc2

USER root

RUN zypper -n update
RUN zypper --non-interactive install -y git-core vim make

ARG git_email git_name

RUN git config --global user.email ${git_email}
RUN git config --global user.name ${git_name}
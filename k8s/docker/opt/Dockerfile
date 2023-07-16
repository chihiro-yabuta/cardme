FROM ubuntu

RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y lsof git vim curl make sudo unzip

RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-aarch64.zip" -o "awscliv2.zip"
RUN unzip awscliv2.zip && rm awscliv2.zip
RUN sudo ./aws/install

RUN curl -LO "https://storage.googleapis.com/kubernetes-release/release/\
$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)\
/bin/linux/amd64/kubectl"
RUN chmod +x kubectl && mv kubectl /usr/local/bin

RUN curl -sLO "https://github.com/eksctl-io/eksctl/releases/\
latest/download/eksctl_linux_amd64.tar.gz"
RUN tar -xzf eksctl_linux_amd64.tar.gz && rm eksctl_linux_amd64.tar.gz
RUN sudo mv eksctl /usr/local/bin

ARG git_email git_name access secret

RUN git config --global user.email ${git_email}
RUN git config --global user.name ${git_name}

RUN aws configure set aws_access_key_id ${access}
RUN aws configure set aws_secret_access_key ${secret}
RUN aws configure set region ap-northeast-1
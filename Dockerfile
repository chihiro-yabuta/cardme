FROM node:alpine as node
FROM golang:alpine as golang
FROM alpine

# nodejs
COPY --from=node /usr/local/bin /usr/local/bin
COPY --from=node /usr/local/lib/node_modules/npm /usr/local/lib/node_modules/npm
COPY --from=node /opt/yarn* /opt/yarn
RUN ln -fs /opt/yarn/bin/yarn /usr/local/bin/yarn && \
  ln -fs /opt/yarn/bin/yarnpkg /usr/local/bin/yarnpkg

# golang
COPY --from=golang /usr/local/go /usr/local/go
ENV PATH $PATH:/usr/local/go/bin/

# update alpine
RUN apk update && apk --update add sudo wget vim make git
FROM node

COPY --from=golang /usr/local/go /usr/local/go
ENV PATH $PATH:/usr/local/go/bin/

ARG git_email git_name

RUN git config --global user.email ${git_email}
RUN git config --global user.name ${git_name}
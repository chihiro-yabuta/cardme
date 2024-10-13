FROM node

COPY --from=golang /usr/local/go /usr/local/go
ENV PATH $PATH:/usr/local/go/bin/

WORKDIR /cardme
COPY . .
RUN go mod tidy
RUN npm i
RUN npm run build

EXPOSE 8080

ENV PORT 8080
ENV HOSTNAME "0.0.0.0"

CMD go run main.go
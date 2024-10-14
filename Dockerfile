FROM node AS js
WORKDIR /cardme
COPY . .
RUN npm i && npm run build

FROM golang
WORKDIR /cardme
COPY . .
COPY --from=js /cardme/public public
RUN go mod tidy

EXPOSE 8080
CMD ["go", "run", "main.go"]
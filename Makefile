.PHONY: _down, _clean, _build, _client, _server

default:
	docker compose up -d
_down:
	docker compose down
	docker system prune -a
	make _clean
_clean:
	cd server \
		&& rm -f -R go.mod go.sum
	cd client \
		&& rm -f -R node_modules package-lock.json

_build:
	cd client && npm install
	cd server \
		&& rm -f -R go.mod go.sum \
		&& go mod init go \
		&& go get -u github.com/gin-gonic/gin \
		&& go get github.com/google/go-github/v48 \
		&& go get github.com/google/go-querystring \
		&& go get github.com/jinzhu/copier \
		&& go get github.com/gin-contrib/cors
_client:
	cd client && npm run start
_server:
	cd server && go run main.go
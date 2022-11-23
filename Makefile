.PHONY: _up, _down, _clean, _test, _run, _build, _kill, _client, _server

default:
	-sudo iptables -t nat -I PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 3000
	make _client && make _server
_up:
	docker compose up -d
_down:
	docker compose down
	docker system prune -a
	make _clean
_clean:
	cd server \
		&& rm -f -R go.mod go.sum
	cd client \
		&& rm -f -R node_modules package-lock.json \
		&& cd public \
			&& rm -f -R index.js index.js.LICENSE.txt

_test:
	circleci config validate
_run:
	-make _kill
	make _build

_build:
	make _clean
	cd client && npm install
	cd server \
		&& go mod init go \
		&& go get -u github.com/gin-gonic/gin \
		&& go get github.com/google/go-github/v48 \
		&& go get github.com/google/go-querystring \
		&& go get github.com/jinzhu/copier \
		&& go get github.com/gin-contrib/cors
_kill:
	pkill webpack
	pkill main
_client:
	cd client && npm run open &
_server:
	cd server && go run main.go &

# memo

# curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
# . ~/.nvm/nvm.sh
# nvm install v17.6.0
# wget https://golang.org/dl/go1.19.3.linux-amd64.tar.gz
# sudo tar -C /usr/local -xzf go1.19.3.linux-amd64.tar.gz
# echo "export PATH=/usr/local/go/bin:$PATH" >> .bash_profile
# source ~/.bash_profile
# sudo yum install git
# git clone https://github.com/chihiro-yabuta/cardme.git
# cd cardme
# git checkout dev-server
# make _build && make _client && make _server

# tr -d "\n" < .circleci/cardme.pem | cat
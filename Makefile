.PHONY: _up, _down, _clean, _test, _run, _build, _kill, _client, _server

default:
	-make _kill
	-sudo iptables -t nat -I PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 8080
	make _server
_up:
	. sh/env.sh
	docker compose up -d
	rm .env
_down:
	docker compose down
	docker system prune -a
	make _clean
_clean:
	cd server \
		&& rm -f -R go.sum public
	cd client \
		&& rm -f -R node_modules package-lock.json \
		&& cd public \
			&& rm -f -R assets/index.js assets/index.js.LICENSE.txt

_test:
	circleci config validate
_run:
	cd client && npm install && npm run build
	cp -r client/public/ server

_build:
	make _clean
	cd client && npm install
	cd server && go mod tidy
_kill:
	pkill main
	pkill webpack
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
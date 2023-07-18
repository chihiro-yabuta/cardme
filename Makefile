.PHONY: c, s, d, r, test

default:
	. sh/env.sh
	docker compose up -d
	rm .env
c:
	cd client && npm install && npm run build
	cp -r client/public server
s:
	redis-server server/redis.conf &
	cd server && go mod tidy && go run main.go

d:
	docker compose down
	docker system prune -a
r:
	cd server \
		&& rm -f -R go.sum public
	cd client \
		&& rm -f -R node_modules package-lock.json \
		&& cd public \
			&& rm -f -R assets/index.js assets/index.js.LICENSE.txt
test:
	circleci config validate
launch:
	. sh/launch.sh
	. sh/pv.sh
	kubectl apply -k k8s
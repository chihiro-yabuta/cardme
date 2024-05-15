default:
	sh sh/env.sh
	docker compose up -d
	rm .env
admin:
	sh sh/env.sh admin
	docker compose up -d
	rm .env
i:
	npm install && go mod tidy
b:
	npm run build && cp -r public api
r:
	go run api/main.go

d:
	docker compose down
	docker system prune -a
	rm -f -R node_modules package-lock.json go.sum .env
p-%:
	sh sh/push.sh ${@:p-%=%}
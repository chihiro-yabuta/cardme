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
	npm run build
r:
	go run main.go

d:
	docker compose down
	docker system prune -a
	rm -f -R node_modules package-lock.json go.sum .env public/js
p-%:
	sh sh/push.sh ${@:p-%=%}
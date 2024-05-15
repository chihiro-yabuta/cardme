default:
	sh sh/env.sh
	docker compose up -d
admin:
	sh sh/env.sh admin
	docker compose up -d
i:
	npm install && go mod tidy && make b && make r
b:
	rm -f -R api/public && npm run build && cp -r public api
r:
	go run api/main.go

d:
	docker compose down
	docker system prune -a
	rm -f -R node_modules package-lock.json go.sum
p-%:
	sh sh/push.sh ${@:p-%=%}
default:
	. env.sh
	docker compose up -d
	rm .env
admin:
	. env.sh admin
	docker compose up -d
	rm .env
c:
	npm install && npm run build
s:
	go mod tidy && go run main.go

d:
	docker compose down
	docker system prune -a
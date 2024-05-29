include .env

default:
	sh sh/env.sh
	docker compose up -d
admin:
	sh sh/env.sh admin
	docker compose up -d
i:
	npm install && go mod tidy && make b && make r
b:
	npm run build
r:
	go run main.go
v:
	vercel --prod
c:
	redis-cli --tls -u redis://default:$(pswd)@$(host)

d:
	docker compose down
	docker system prune -a
	rm -f -R node_modules package-lock.json go.sum .vercel
p-%:
	sh sh/push.sh ${@:p-%=%}
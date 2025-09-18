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
R:
	sh sh/env.sh
	npm install && go mod tidy && make b
	HOSTNAME=127.0.0.1 PORT=8080 go run main.go &

d:
	docker compose down
	docker system prune -a
	rm -f -R node_modules package-lock.json go.sum public/*.js
p-%:
	sh sh/push.sh ${@:p-%=%}

# sudo dnf install -y nginx git make golang
# sudo dnf module install -y nodejs:22
# sudo setsebool -P httpd_can_network_connect on
# sudo systemctl enable --now nginx
# cp nginx.conf /etc/nginx/conf.d/app.conf
# sudo nginx -t && sudo systemctl reload nginx
# sudo dnf -y install epel-release
# sudo dnf -y install certbot
# sudo dnf -y install python3-certbot-nginx
# sudo certbot --nginx -d cardme.jp --agree-tos -m ja.chihiro.yabuta@gmail.com --redirect
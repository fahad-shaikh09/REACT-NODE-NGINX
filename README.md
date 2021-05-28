# REACT-NODE-NGINX
nano /etc/apt/sources.list
deb http://nginx.org/packages/mainline/ubuntu/ bionic nginx

sudo wget http://nginx.org/keys/nginx_signing.key
sudo apt-key add nginx_signing.key

sudo apt update
sudo apt install nginx
sudo systemctl start nginx
sudo systemctl enable nginx


mkdir NodeReactNginxApp
mkdir FrontEnd
mkdir BackEnd

cd FrontEnd
npx create-react-app

cd BackEnd
npm init
npm install --save express


****** Configure the App ******
nano app.js
const express = require('express')
const app = express()

app.get('/server', (req, res) => res.send('Hello World from NodeJS Server!'))

app.listen(5000, () => console.log('Node.js app listening on port 5000.'))


node app.js


curl localhost:5000


****** Configure NGINX ******
nano /etc/nginx/conf.d/nodeapp.conf

server {
        listen 80;
        listen [::]:80;

        server_name example.com;

        location / {
        proxy_pass http://localhost:3000/;
        }

        location /server {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-NginX-Proxy true;
        proxy_pass http://localhost:5000/server;
        proxy_ssl_session_reuse off;
        proxy_set_header Host $http_host;
        proxy_cache_bypass $http_upgrade;
        proxy_redirect off;
	}
}
save

sudo mv /etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf.disabled

nginx -t
systemctl restart nginx


nano /etc/hosts
127.0.0.1	example.com


http://localhost:3000/  >>> it will run React App
http://localhost:5000/server  >>> it will run NODEJS App


http://example.com/  >>> it will run React App

http://example.com/server  >>> it will run NODEJS App





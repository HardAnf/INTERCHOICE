server {

    server_name inter-choice.ru;

    root /home/mihett05/interchoice/dist;

    access_log /var/log/access_static.log;
    error_log /var/log/error_static.log;

    location / {
        autoindex on;
        index index.html;

        try_files $uri /index.html;
    }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/inter-choice.ru/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/inter-choice.ru/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

}

server {
    if ($host = inter-choice.ru) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    listen 80;

    server_name inter-choice.ru;
    return 404; # managed by Certbot


}

server {

    server_name analytic.inter-choice.ru;

    access_log /var/log/access.log;
    error_log /var/log/error.log;

    root /home/mihett05/interchoice;

    location / {
        include proxy_params;
        client_max_body_size 4G;
        proxy_pass http://localhost:8080;
    }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/analytic.inter-choice.ru/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/analytic.inter-choice.ru/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

}

server {
    if ($host = analytic.inter-choice.ru) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    listen 80;

    server_name analytic.inter-choice.ru;
    return 404; # managed by Certbot


}
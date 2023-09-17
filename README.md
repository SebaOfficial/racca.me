# Personal Website
Just my personal website, built in [PHPStatic](https://github.com/SebaOfficial/PHPStatic).

## Installation
1. Clone this repository and `cd` into it
```bash
git clone https://github.com/SebaOfficial/racca.me.git && cd racca.me 
```
2. Update Dependencies and build the website
```bash
composer update
composer build
```

3. Start a web server
    *Nginx Example:*
    ```nginx
    server {
        listen 80;
        listen [::]:80;

        index index.html index.php;

        server_name localhost; # Replace with your server name
        root /path/to/racca.me/dist/; # Replace with the actual path

        location / {
            try_files $uri $uri/ $uri.html $uri.php =404;
        }

        location ~ \.php$ {
            include snippets/fastcgi-php.conf;
            fastcgi_pass unix:/run/php/php8.1-fpm.sock; # Replace with your php version
        }

        error_page 404 404.html;
    }
    ```
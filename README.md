# Personal Website
Just my personal website.

## Installation
1. Clone this repository and `cd` into it
```bash
git clone https://github.com/SebaOfficial/racca.me.git && cd racca.me 
```
2. Install Dependencies
```bash
composer update
```
3. Start a web server that points to `src/public/index.php` whenever another page isn't found.<br>
    *Nginx Example:*
    ```nginx
    server {
        listen 80;
        listen [::]:80;

        index index.html index.php;

        server_name localhost; # Replace with your server name
        root /path/to/racca.me/src/public/; # Replace with the actual path

        location / {
            try_files $uri $uri/ /index.php?$args;
        }

        location ~ \.php$ {
            include snippets/fastcgi-php.conf;
            fastcgi_pass unix:/run/php/php8.1-fpm.sock; # Replace with your php version
        }
    }
    ```

## Features
* **SSR:** Server Side Rendering in PHP for the multi language support.
* **Multi Language Support:** The website currently supports English and Italian
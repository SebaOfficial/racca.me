# Personal Website
Just my personal website.

## Installation
1. Clone this repository and `cd` into it
```bash
git clone https://github.com/SebaOfficial/racca.me.git && cd racca.me 
```
2. Update Dependencies and build the website
```bash
./update.sh
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

## Features
* **Front-end Emphasis:** The website is designed with a focus on front-end development, with pages neatly organized in the `src/pages/` directory for easy management and customization.

* **User-Generated Content:** Users have the flexibility to create and publish their own files in the src/public/ directory, making content publicly available without complex backend processes.

* **Multi-Language Support:** The website offers multi-language support, with language files conveniently stored in the `src/locales/` directory, allowing for easy translation and localization.

* **SEO-Friendly:** The website is optimized for search engines, ensuring that it ranks well in search results and attracts organic traffic with proper SEO practices and techniques.
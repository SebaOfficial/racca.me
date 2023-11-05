# Personal Website
Just my personal website, built in [PHPStatic](https://github.com/SebaOfficial/PHPStatic).

## Installation
You can either install the website directly or use Docker.

### Direct Installation
Install the website from GitHub.
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
            try_files $uri $uri/ $uri.html @php;
        }

        location @php {
		    rewrite ^(.*)$ $1.php last;
	    }

        location ~ \.php$ {
            include snippets/fastcgi-php.conf;
            fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
            fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
            fastcgi_param SCRIPT_NAME $fastcgi_script_name;
        }

        location ~* 404 {
            return 404;
        }

        error_page 404 404.html;
    }
    ```


### Docker Installation
You can also download and run the website using Docker.

1. Pull the Docker image from Docker Hub:
```bash
docker pull sebaofficial/racca.me
```

2. Run the Docker image:
```bash
docker run -d -p 80:80 sebaofficial/racca.me
```
FROM php:8.1-fpm

RUN apt-get update && apt-get install -y \
  nginx \
  libonig-dev \
  libzip-dev

COPY . /var/www/html

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer install

COPY ./conf.d/nginx.conf /etc/nginx/sites-available/default

RUN docker-php-ext-install pdo_mysql mbstring zip exif pcntl

CMD ["nginx", "-g", "daemon off;"]
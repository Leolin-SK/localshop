FROM php:8.3-cli

RUN apt-get update && apt-get install -y \
    git unzip libpq-dev libzip-dev \
    && docker-php-ext-install pdo pdo_pgsql zip \
    && rm -rf /var/lib/apt/lists/*

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app

COPY composer.json composer.lock ./

RUN composer install \
    --no-dev \
    --optimize-autoloader \
    --no-interaction \
    --no-scripts \
    --ignore-platform-reqs

COPY . .

RUN composer dump-autoload --optimize --no-interaction

CMD php artisan config:cache && php artisan migrate --force && php -S 0.0.0.0:$PORT -t public
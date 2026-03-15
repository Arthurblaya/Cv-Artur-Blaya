FROM node:22.12-alpine AS build

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY angular.json tsconfig.json tsconfig.app.json ./
COPY public ./public
COPY src ./src

RUN npm run build

FROM nginx:1.29-alpine

COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/arturblaya-web/. /usr/share/nginx/html

EXPOSE 80

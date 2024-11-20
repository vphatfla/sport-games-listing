# Stage 1: build static file
FROM node:18-alpine as builder

WORKDIR /app

COPY sports-website/package.json sports-website/package-lock.json ./

RUN npm install

COPY sports-website/ ./

RUN npm run build

#Stage 2: serve static files using NGINX
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

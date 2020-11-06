FROM node:12-alpine as builder
WORKDIR /app
COPY . .
RUN yarn run build

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY /default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
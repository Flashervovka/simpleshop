FROM node:12-alpine as builder
WORKDIR /app
COPY . .
RUN yarn run build

FROM node:12-alpine
RUN yarn global add serve
WORKDIR /app
COPY --from=builder /app/build .
CMD ["serve", "-p", "80", "-s", "."]
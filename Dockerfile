### STAGE 1: Build ###
FROM node:12.19.0-alpine3.10 AS build

RUN mkdir -p .tmp-app

COPY package*.json ./

RUN npm set registry https://registry.npmjs.org
RUN npm install && mkdir -p /app && mv ./node_modules /app

WORKDIR /app

COPY ./ ./

RUN npm run build

### STAGE 2: Make artefacts ###
FROM alpine:3.10

# update alpine linux, install necessary packages
RUN apk update && apk upgrade && \
    apk add --no-cache bash nginx

COPY --from=build /app/.nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/.nginx/ssl /etc/nginx/ssl
COPY --from=build /app/dist /app

CMD ["nginx", "-g", "daemon off;"]

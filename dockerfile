FROM node:16-bullseye as build

WORKDIR /app

RUN apt-get update && apt-get install -y python3 make g++

COPY package*.json ./
RUN npm install

RUN echo "globalThis.crypto = require('crypto').webcrypto;" > crypto-polyfill.js
COPY . .

RUN sed -i '1i import "./crypto-polyfill";' src/main.tsx

RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
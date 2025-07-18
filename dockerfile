FROM node:18-bullseye as build

WORKDIR /app

RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install --force

RUN mkdir -p src && \
    echo "import { webcrypto } from 'crypto'; globalThis.crypto = webcrypto;" > src/crypto-polyfill.ts

COPY . .

RUN sed -i '1i import "./crypto-polyfill";' src/main.tsx

RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
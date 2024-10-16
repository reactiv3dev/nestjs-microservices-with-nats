FROM node:20.18-alpine

WORKDIR /app

RUN npm install -g pnpm

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN pnpm install

ENV NATS_SERVER_ADDRESS=nats

COPY . .
 
 
FROM node:18-alpine AS build

WORKDIR /app

ARG VITE_API_BASE_URL
ARG VITE_DISCORD_CDN
ARG VITE_DISCORD_INVITE

ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_DISCORD_CDN=$VITE_DISCORD_CDN
ENV VITE_DISCORD_INVITE=$VITE_DISCORD_INVITE

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
COPY .env .env

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

FROM node:18-alpine AS builder
WORKDIR /app/src
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build --prod --configuration=production:ssr

FROM node:18-alpine

WORKDIR /usr/app
COPY --from=builder /app/src/dist/fechikiet ./
EXPOSE 4000
CMD [ "node", "server/server.mjs" ]

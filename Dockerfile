FROM node:18.1.0-alpine3.14 AS builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma

RUN npm install

COPY . .

RUN npm run build

FROM node:18.1.0-alpine3.14

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

EXPOSE 8910

CMD [ "npm", "run", "start:prod" ]
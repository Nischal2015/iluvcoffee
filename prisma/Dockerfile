FROM node:18.1.0-alpine3.14

WORKDIR /app

RUN npm install -g prisma --unsafe-perm

ADD ./ ./prisma/

CMD ["prisma", "migrate", "deploy"]
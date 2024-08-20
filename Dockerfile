FROM node:20.16-alpine

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

RUN mkdir -p /app
WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

RUN chown -R appuser:appgroup /app

USER appuser

EXPOSE 3000

CMD ["node", "src/index.js"]

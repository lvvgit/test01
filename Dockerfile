# --- #1 ---
FROM node:20-slim AS builder
WORKDIR /app
COPY package*.json ./

RUN npm install

# --- #2 ---
FROM node:20-slim
WORKDIR /app


COPY --from=builder /app .
COPY . .

#--- не-root користувач
USER node

# Порт назовні
EXPOSE 8080

CMD ["npm", "start"]

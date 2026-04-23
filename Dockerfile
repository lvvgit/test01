FROM node:20-slim AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install


FROM node:20-slim
WORKDIR /app

COPY --from=builder /app .
COPY . .

USER root
RUN mkdir -p /apps/data && chown -R node:node /apps/data
USER node

EXPOSE 8080
CMD ["npm", "start"]

# =========================
# 1. Build stage
# =========================
FROM node:20-alpine AS builder

WORKDIR /app

# Copiamos solo manifests para cachear dependencias
COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

# Copiamos el resto del proyecto
COPY . .

# Build de NestJS
RUN yarn build


# =========================
# 2. Production stage
# =========================
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/package.json /app/yarn.lock ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

COPY --from=builder /app/drizzle ./drizzle
COPY --from=builder /app/drizzle.config.ts ./drizzle.config.ts

ENV NODE_ENV=production

EXPOSE 8000

# Ejecuta migraciones antes de iniciar la app
CMD ["sh", "-c", "yarn migration:migrate && yarn start:prod"]

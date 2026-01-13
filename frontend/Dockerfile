# =========================
# 1. Build stage
# =========================
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar manifests
COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

# Copiar el resto del proyecto
COPY . .

# Build del frontend
RUN yarn build


# =========================
# 2. Production stage
# =========================
FROM nginx:alpine

# Eliminar config default
RUN rm /etc/nginx/conf.d/default.conf

# Copiar nuestra configuración
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar el build del frontend
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

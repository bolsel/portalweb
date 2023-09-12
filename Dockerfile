
FROM node:18-alpine AS prodlib
WORKDIR /app
COPY package*.json ./
COPY pnpm-lock.yaml ./
RUN pnpm install --offline --frozen-lockfile --prod

FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY pnpm-lock.yaml ./
RUN pnpm install --offline --frozen-lockfile
COPY . .
RUN pnpm build

FROM node:18-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY --chown=node:node --from=builder /app/package*.json ./
COPY --chown=node:node --from=builder /app/.next ./.next
COPY --chown=node:node --from=builder /app/public ./public
COPY --chown=node:node --from=prodlib /app/node_modules ./node_modules
ENV NODE_ENV=production
ENV PORT 80
USER node
EXPOSE 80
CMD ["npm", "start"]

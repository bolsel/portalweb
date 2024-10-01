
FROM node:18.12.1-alpine AS prodlib
WORKDIR /app

COPY package.json .
RUN corepack enable && corepack prepare

COPY pnpm-lock.yaml .
RUN pnpm install --prod

FROM node:18.12.1-alpine AS builder
WORKDIR /app

COPY package.json .
RUN corepack enable && corepack prepare

COPY pnpm-lock.yaml .
RUN pnpm install

COPY . .
RUN pnpm build

FROM node:18.12.1-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY --chown=node:node --from=prodlib /app/node_modules ./node_modules
COPY --chown=node:node --from=builder /app/package.json ./
COPY --chown=node:node --from=builder /app/next.config.js ./
COPY --chown=node:node --from=builder /app/public ./public
COPY --chown=node:node --from=builder /app/.next ./.next
ENV NODE_ENV=production
ENV PORT 80
USER node
EXPOSE 80
CMD ["npm", "start"]

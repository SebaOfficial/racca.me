# syntax=docker/dockerfile:1.7
FROM node:25-alpine AS baseimage

FROM baseimage AS base
RUN npm install -g pnpm@10
WORKDIR /app

FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
	pnpm install --frozen-lockfile --ignore-scripts

FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm run build
RUN pnpm prune --prod

FROM baseimage AS runtime
ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0
WORKDIR /app

RUN addgroup -S -g 1001 sveltekit \
	&& adduser -S -u 1001 -G sveltekit sveltekit

COPY --from=build --chown=sveltekit:sveltekit /app/build ./build
COPY --from=build --chown=sveltekit:sveltekit /app/node_modules ./node_modules
COPY --from=build --chown=sveltekit:sveltekit /app/package.json ./package.json

USER sveltekit
EXPOSE 3000

CMD ["node", "build/index.js"]

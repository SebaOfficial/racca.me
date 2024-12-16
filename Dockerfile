FROM node:22

WORKDIR /app

COPY package.json .
COPY pnpm-lock.yaml .
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

RUN pnpm install

COPY . .

RUN pnpm build

RUN apt-get update && \
  apt-get install -y libnss3 libatk-bridge2.0-0 libx11-xcb1 libxcomposite1 libxrandr2 libxdamage1 libgbm1 libasound2 libpangocairo-1.0-0 libxshmfence1 libgtk-3-0 libcurl4

EXPOSE 3000

CMD [ "npx", "concurrently", "node build", "npm run gen:preview -- https://racca.me" ]

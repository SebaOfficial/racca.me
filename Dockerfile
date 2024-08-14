FROM node:22

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

RUN apt-get update && \
  apt-get install -y libnss3 libatk-bridge2.0-0 libx11-xcb1 libxcomposite1 libxrandr2 libxdamage1 libgbm1 libasound2 libpangocairo-1.0-0 libxshmfence1 libgtk-3-0 libcurl4

EXPOSE 3000

CMD [ "npx", "concurrently", "node build", "npm run gen:preview -- https://racca.me" ]

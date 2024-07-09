FROM node:22

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npx", "concurrently", "node build", "npm run gen:previews -- http://localhost:3000" ]

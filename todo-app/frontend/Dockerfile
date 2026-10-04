FROM node:18-alpine

WORKDIR /todo-app

COPY package*.json ./
RUN npm install --omit=dev

COPY index.html ./
COPY style.css ./
COPY script.js ./
COPY server.js ./

EXPOSE 80

CMD ["node", "server.js"]

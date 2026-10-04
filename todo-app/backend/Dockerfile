FROM node:18-alpine

WORKDIR /todo-app

COPY package*.json ./
RUN npm install --omit=dev

COPY server.js ./

EXPOSE 3000

CMD ["npm", "start"]

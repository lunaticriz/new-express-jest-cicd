FROM node:latest

WORKDIR /express-app
COPY . .

RUN npm install
CMD [ "node", "src/server.js"]
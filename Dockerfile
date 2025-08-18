FROM node:latest

WORKDIR /express-app
COPY . .

RUN npm install
EXPOSE 3000
CMD [ "node", "src/server.js"]
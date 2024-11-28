FROM node:23-alpine

WORKDIR /react-docker/

COPY public/ /react-docker/public
COPY src/ /react-docker/src
COPY package.json /react-docker/

RUN npm install

CMD ["npm", "start"]

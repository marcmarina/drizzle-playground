FROM node:20-slim

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install

COPY ./src ./src
COPY tsconfig.json ./

RUN yarn build

RUN yarn install --production

RUN mkdir database

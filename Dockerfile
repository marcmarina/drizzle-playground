FROM node:20-slim

WORKDIR /usr/src/app

COPY package.json yarn.lock tsconfig.json ./

RUN yarn install

COPY ./src ./src

RUN yarn build

RUN yarn install --production

RUN mkdir database

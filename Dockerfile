FROM node:20-slim

WORKDIR /usr/src/app

COPY package.json yarn.lock tsconfig.json .yarnrc.yml ./
COPY ./.yarn ./.yarn

RUN yarn install

COPY ./src ./src

RUN yarn build

RUN yarn workspaces focus -A --production

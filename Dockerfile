FROM node:20.19-slim AS build

WORKDIR /usr/src/app

COPY package.json yarn.lock tsconfig.json .yarnrc.yml ./
COPY ./.yarn ./.yarn

RUN yarn install

COPY ./src ./src
COPY ./environments ./environments

RUN yarn build

RUN yarn workspaces focus -A --production

FROM node:20.19-slim

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/ ./

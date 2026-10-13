FROM node:20.19-slim AS build

WORKDIR /usr/src/app

COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn/releases ./.yarn/releases

RUN yarn install --immutable

COPY tsconfig.json ./
COPY src ./src

RUN yarn build
RUN yarn workspaces focus --production

FROM node:20.19-slim

WORKDIR /usr/src/app

COPY package.json ./
COPY environments ./environments
COPY src/database/drizzle ./src/database/drizzle
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist

USER node

FROM node:19-alpine3.16 AS development

WORKDIR /usr/src/app

COPY package.json yarn.* ./

RUN yarn

COPY . .

RUN yarn build

FROM node:10-alpine

LABEL name "Abayro"
LABEL version "4.0.0"
LABEL maintainer "NourEldien"

WORKDIR /usr/src/abayro

COPY package.json yarn.lock ./

RUN apk add --update \
&& apk add --no-cache ca-certificates \
&& apk add --no-cache --virtual .build-deps git curl build-base python g++ make \
&& apk add build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
&& yarn install \
&& apk del .build-deps

COPY . .

ENV NODE_ENV= \
	TOKEN= \
	YOUTUBE= \
	DATABASE= \
	DBL=

CMD ["node", "src/tsuki.js"]
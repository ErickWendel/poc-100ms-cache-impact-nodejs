FROM node:16-alpine

WORKDIR /src/

COPY package.json package-lock.json /src/

RUN  npm ci --silent

COPY . /src

CMD npm run seed-and-servers
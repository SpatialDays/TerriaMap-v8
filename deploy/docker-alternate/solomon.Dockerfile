# Docker image for the primary terria map application server
FROM node:14 AS build

RUN mkdir -p /usr/src/app && mkdir -p /etc/config/client
WORKDIR /usr/src/app

ENV NODE_OPTIONS=--max_old_space_size=4096

COPY ./package.json ./

COPY ./packages ./packages
RUN yarn install

COPY . .

#RUN rm wwwroot/config.json && ln -s /etc/config/client/config.json wwwroot/config.json

# Solomon build stage
FROM build AS solomon_build
RUN cp -r wwwroot/help/img/help_solomon/. wwwroot/help/img/.
RUN cp wwwroot/images/SI_high.png wwwroot/images/help_logo.png
RUN yarn gulp release --build Solomons

# Primary application server stage
FROM solomon_build AS server
EXPOSE 3001

# CMD [ "node", "./node_modules/terriajs-server/lib/app.js", "--config-file", "devserverconfig.json" ]

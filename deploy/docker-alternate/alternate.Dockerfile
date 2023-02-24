# Docker image for the primary terria map application server
FROM node:14 AS build

RUN mkdir -p /usr/src/app && mkdir -p /etc/config/client
WORKDIR /usr/src/app

COPY ./package.json ./

RUN npm install

COPY . .

RUN rm wwwroot/config.json && ln -s /etc/config/client/config.json wwwroot/config.json

# Solomon build stage
FROM build AS solomon_build
RUN cp -r wwwroot/help/img/help_solomon/. wwwroot/help/img/.
RUN cp wwwroot/images/SI_high.png wwwroot/images/help_logo.png
RUN npm run gulp release -- --build Solomons

# Vanuatu build stage
FROM build AS vanuatu_build
RUN sed -i 's/hsl(209, 79%, 42%)/hsl(44, 92%, 45%)/' lib/Styles/variables.scss
RUN sed -i 's/Solomon Islands/Vanuatu/' node_modules/terriajs/lib/Language/en/translation.json
RUN npm run gulp release -- --build Vanuatu

# Primary application server stage
FROM build AS server
EXPOSE 3001

CMD [ "node", "./node_modules/terriajs-server/lib/app.js", "--config-file", "devserverconfig.json" ]

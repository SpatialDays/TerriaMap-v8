# Docker image for the primary terria map application server
FROM node:14 AS build

RUN mkdir -p /usr/src/app && mkdir -p /etc/config/client
WORKDIR /usr/src/app

ENV NODE_OPTIONS=--max_old_space_size=4096

COPY ./package.json ./

COPY ./packages ./packages
RUN yarn install

COPY . .

# # Vanuatu build stage
FROM build AS vanuatu_build
RUN sed -i 's/hsl(209, 79%, 42%)/hsl(44, 92%, 45%)/' lib/Styles/variables.scss
COPY wwwroot/images/VT_high.png wwwroot/images/SI_high.png
RUN sed -i 's/Solomon Islands/Vanuatu/' node_modules/terriajs/wwwroot/languages/en/translation.json
RUN yarn gulp release --build Vanuatu

# Primary application server stage
FROM vanuatu_build AS server
EXPOSE 3001

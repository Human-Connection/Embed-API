FROM node:10-alpine
LABEL Description="API Service for fetching URL Information like images, icons, descriptions etc. through OpenGraph, oEmbed and other standards. " Vendor="Human-Connection gGmbH" Version="1.0" Maintainer="Human-Connection gGmbH (developer@human-connection.org)"

# expose the app port
EXPOSE 3050

# set environment variables
# ENV NPM_CONFIG_PRODUCTION=false
# ENV EMBED_API_HOST=0.0.0.0
ENV NODE_ENV=production
ENV EMBED_API_PORT=3050

# create working directory
RUN mkdir -p /var/www/
WORKDIR /var/www/

# install app dependencies
COPY package.json /var/www/
COPY yarn.lock /var/www/
RUN yarn install --frozen-lockfile --non-interactive --production=false --ignore-engines

# copy the code to the docker image
COPY . /var/www/

# start the application in a autohealing cluster
#CMD pm2 start server/index.js -n api -i 0 --attach
# as we have issues with pm2 currently in conjunction with nuxt, we use the standard approach here
CMD node src/

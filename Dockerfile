FROM node:10-alpine
# RUN apk add --no-cache bash
WORKDIR /usr/app
COPY package*.json /usr/app/
RUN npm install
COPY controllers /usr/app/controllers
COPY models /usr/app/models
COPY routes /usr/app/routes
COPY app.js /usr/app
# COPY ./wait-for-it.sh /usr/app/
EXPOSE 3000
CMD ["npm", "start"]

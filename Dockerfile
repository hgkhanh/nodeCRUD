FROM node:10-alpine
WORKDIR /usr/app
ENV MCCCOURSE 2019
ADD main.sh /usr/app
RUN chmod 755 /usr/app/main.sh

FROM node:10-slim

# Create app directory
RUN mkdir -p /usr/src/app/dist/
WORKDIR /usr/src/app/dist/

ADD ./.env /usr/src/app/dist/

# Install app dependencies
ADD package.json /usr/src/app/dist/package.json
ADD package-lock.json /usr/src/app/dist/package-lock.json
RUN npm install --prod && npm cache clean --force

# Bundle app source
ADD dist /usr/src/app/dist/


EXPOSE 5000
CMD [ "npm", "run", "start:prod" ]

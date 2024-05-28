FROM node:20

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

RUN npm install --save-dev typescript


# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "npm","start" ]
# using node alpine as base image
FROM node:18.19.0-alpine

# working dir ./app
WORKDIR /app

# Copy react package.json
COPY ./package.json .

# install dependencies
COPY . .
RUN npm install
# RUN npm i -g truffle 
RUN npm i -g truffle 

# COPY client directory folder

# RUN truffle migrate

CMD ["sh", "-c", "truffle migrate && npm start"]

# default command
# RUN npm run build
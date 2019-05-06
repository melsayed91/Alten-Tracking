FROM node:10-alpine
WORKDIR /usr/app
COPY package*.json ./
RUN npm cache verify && \
    npm install --silent --progress=false --production
COPY . . 
EXPOSE 3001
CMD ["npm", "start"]
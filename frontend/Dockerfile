FROM node:12.14.0-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 4200
CMD npm run start

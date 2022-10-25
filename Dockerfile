FROM node

WORKDIR /usr/server/contreasy-api

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3333

CMD ["npm", "run", "dev"]
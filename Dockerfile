FROM node:14

WORKDIR /back

COPY package*.json ./
RUN npm install

COPY . .

ENV JWT_SECRET=KEJHKJlkfjsdklfjskldklsq78749080jkfsdlkjfsè389809

ENV MONGODB_PW=MariaStrime

CMD ["npm", "start"]
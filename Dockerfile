FROM node:18-alpine
RUN echo "Bike Shop"

#set working directory
WORKDIR /app

#copy package.json package-lock.json
COPY package*.json ./

#install depencies
RUN npm install

#copy app src
COPY . .

#build js app
RUN npm run build

#expose app port
EXPOSE 3000

#define commande to run app
CMD ["npm", "run", "start:prod"]



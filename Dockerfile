
FROM node:22-alpine

WORKDIR /app

COPY ./noesis/package*.json ./

RUN npm install

COPY ./noesis .

EXPOSE 5173

CMD ["npm", "run", " dev"]
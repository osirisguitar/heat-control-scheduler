FROM node:16-alpine

WORKDIR /app
COPY src /app/src
COPY tsconfig.json /app/
COPY package.json /app/
COPY package-lock.json /app/

RUN npm install --production

EXPOSE 8001

CMD npm run dev
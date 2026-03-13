FROM node:18-alpine

RUN apk add --no-cache vips-dev fftw-dev gcc g++ make python3

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

RUN npm prune --production

EXPOSE 3000

CMD ["node", "dist/src/server.js"]
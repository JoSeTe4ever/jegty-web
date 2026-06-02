FROM node:14-bullseye

WORKDIR /app

ENV NPM_CONFIG_REGISTRY=https://registry.npmjs.org/

COPY package*.json ./
RUN npm install -g npm@9 \
  && npm ci --legacy-peer-deps

COPY . .

ENV HOST=0.0.0.0
ENV PORT=5000
ENV WDS_SOCKET_PORT=5000

EXPOSE 5000

CMD ["npm", "start"]

FROM node:14-bullseye

WORKDIR /app

COPY package*.json ./
RUN sed -i 's#https://pkgs.dev.azure.com/basf4Businesses/CustomerFacingDataServices/_packaging/CFDS/npm/registry/#https://registry.npmjs.org/#g' package-lock.json \
  && npm install -g npm@9 \
  && npm ci --legacy-peer-deps --registry=https://registry.npmjs.org/

COPY . .

ENV HOST=0.0.0.0
ENV PORT=5000
ENV WDS_SOCKET_PORT=5000

EXPOSE 5000

CMD ["npm", "start"]

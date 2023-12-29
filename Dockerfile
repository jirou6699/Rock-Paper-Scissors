FROM nginx

# Node.jsのバージョンを指定
ARG NODE_VERSION=18

# Node.jsとnpmのインストール
RUN apt-get update && \
    apt-get install -y curl && \
    curl -sL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# WORKDIR /src/client
# COPY ./src/client/package.json /src/client/
# RUN npm install
COPY ./src /usr/share/nginx/html
# CMD [ "npm", "start" ]
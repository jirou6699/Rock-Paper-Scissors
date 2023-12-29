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

WORKDIR /usr/share/nginx/html
COPY ./src .

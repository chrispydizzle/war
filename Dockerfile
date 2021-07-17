FROM node:14.16.1-alpine AS kraken_builder

WORKDIR /usr/src/app

ENV FORCE_COLOR=true

RUN echo 'http://dl-cdn.alpinelinux.org/alpine/v3.9/main' >> /etc/apk/repositories \
  && echo 'http://dl-cdn.alpinelinux.org/alpine/v3.9/community' >> /etc/apk/repositories \
  && apk update

RUN apk add \
  python \
  make \
  g++ \
  mongodb \
  yaml-cpp=0.6.2-r2

# Copy root files
COPY package.json tsconfig.json ./

# Install Service
COPY kraken/package*.json kraken/
RUN lerna bootstrap --ci
COPY kraken kraken

# Build Service
RUN lerna run build

# Test Service
RUN NODE_ENV=test OLD_BUCKET_URLS=https://assets.alpha-ux.co/,https://img.a-ux.co/,https://assets.alphahq.com/ lerna run test --scope kraken

# Prune
# https://github.com/lerna/lerna/issues/2196#issuecomment-627724452
RUN lerna exec --parallel -- npm prune --production --no-package-lock

FROM node:14.16.1-alpine AS tide_builder

# Dynamic config
# TODO Provide these from kraken as bootstraped config
# https://app.clubhouse.io/alpha-hq/story/7237/provide-reef-config-through-depths

ARG KRAKEN_QTEST_URL
ARG KRAKEN_CHANNEL_URL
ARG KRAKEN_SAMPLECHAIN_KEY
ARG KRAKEN_LOGROCKET_PROJECT
ARG KRAKEN_GOOGLE_ANALYTICS_PROJECT
ARG KRAKEN_URL
ARG OLD_BUCKET_URLS

ENV VUE_APP_QTEST_URL=$KRAKEN_QTEST_URL
ENV VUE_APP_CHANNEL_URL=$KRAKEN_CHANNEL_URL
ENV VUE_APP_SAMPLECHAIN_KEY=$KRAKEN_SAMPLECHAIN_KEY
ENV VUE_APP_LOGROCKET_PROJECT=$KRAKEN_LOGROCKET_PROJECT
ENV VUE_APP_GOOGLE_ANALYTICS_PROJECT=$KRAKEN_GOOGLE_ANALYTICS_PROJECT
ENV VUE_APP_KRAKEN_URL=$KRAKEN_URL
ENV OLD_BUCKET_URLS=$OLD_BUCKET_URLS

WORKDIR /usr/src/app
ENV FORCE_COLOR=true
ENV JOBS=max

RUN apk --no-cache add \
  python \
  make \
  g++ \
  # https://github.com/Automattic/node-canvas/issues/1487#issuecomment-550063578
  gcc \
  pkgconfig \
  pixman-dev \
  cairo-dev \
  pango-dev \
  libjpeg-turbo-dev \
  giflib-dev

# Install lerna
RUN npm install -g lerna

# Copy root files
COPY package.json lerna.json tsconfig.json ./

# - packages/config
COPY packages/config packages/config

# - packages/shared
COPY packages/shared packages/shared

# - packages/ink
COPY packages/ink packages/ink

# - packages/types
COPY packages/types packages/types

# - This is required until ink removes its circular dependency on tide and reef.
COPY reef/src/styles reef/src/styles

# Install Service
COPY tide/package*.json tide/
RUN lerna bootstrap --ci
COPY tide tide

# Build Service
RUN NODE_OPTIONS=--max_old_space_size=8192 lerna run build --no-bail

# Test Service
RUN NODE_OPTIONS=--max_old_space_size=8192 lerna run test:unit --scope tide

FROM node:14.16.1-alpine
WORKDIR /usr/src/app

# https://github.com/Yelp/dumb-init#what-dumb-init-does
RUN apk add dumb-init

COPY --from=kraken_builder /usr/src/app/packages/shared packages/shared
COPY --from=kraken_builder /usr/src/app/packages/types packages/types
COPY --from=kraken_builder /usr/src/app/kraken kraken
COPY --from=tide_builder /usr/src/app/tide/dist dist/tide

CMD ["dumb-init", "node", "kraken/dist/server.js"]

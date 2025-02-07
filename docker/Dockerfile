ARG NODEJS_IMAGE_TAG=22-bullseye-slim

FROM node:${NODEJS_IMAGE_TAG}

RUN mkdir -p /app
WORKDIR /app

# Make sure the lock file is copied too
COPY --link package*.json ./

# Install app dependencies
RUN npm ci

# Copy app files
COPY --link . .

# Compile assets
RUN npm run build:webpack

EXPOSE 8080

# Start app
CMD [ "npm", "start" ]

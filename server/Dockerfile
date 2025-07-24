FROM node:21.6-alpine3.19
# Set the working directory for the application
WORKDIR /app
ENV PUPPETEER_SKIP_DOWNLOAD=true

# Copy package.json and package-lock.json files into the container
COPY package*.json ./

RUN apk add --no-cache \
    curl \
    bash \
    chromium \
    nss \
    freetype \
    freetype-dev \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    fontconfig

# התקנת Puppeteer והורדת Chrome
RUN npm install puppeteer && \
    npx puppeteer browsers install chrome

    
# הגדרת משתנה סביבה לנתיב של Chromium
ENV CHROMIUM_PATH=/usr/bin/chromium-browser


# RUN apt-get update -yqq && \
#     apt-get install -y chromium nano git && \
#     apt-get clean && \
#     rm -rf /var/lib/apt/lists/*

# Install the dependencies
# RUN npm install
RUN npm ci --only=production

# Copy the rest of the application code into the container
COPY . .

# Expose ports 3000 and 3001 for the application to listen on
EXPOSE 5555

# Start the application based on NODE_ENV
# If NODE_ENV is development, run npm run dev, otherwise run npm start
# CMD ["sh", "-c", "if [ \"$NODE_ENV\" = \"development\" ]; then npm run dev; else npm start; fi"]
CMD ["npm", "start"]
# Use official Node.js LTS lightweight image to optimize build speed and image size
FROM node:20-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package manifests first to leverage Docker layer caching for dependencies
COPY package*.json ./

# Install production dependencies
RUN npm ci --omit=dev

# Copy application source code
COPY . .

# Expose the application port
EXPOSE 3000

# Set production environment
ENV NODE_ENV=production

# Run the application
CMD ["node", "server.js"]

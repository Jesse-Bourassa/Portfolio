# Use Node.js as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the app
COPY . .

# Build the project
RUN npm run build

# Expose the port used by Vite (default is 4173 for preview)
EXPOSE 4173

# Run the preview server
CMD ["npm", "run", "preview"]

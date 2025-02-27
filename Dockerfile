# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json before installing dependencies
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Build the project (if applicable)
RUN npm run build

# Expose the necessary port
EXPOSE 8080

# Command to run the application
CMD ["npm", "start"]

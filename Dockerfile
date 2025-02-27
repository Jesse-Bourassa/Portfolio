# -------------------------------------------------------
# Stage 1: Build the Vue.js application
# -------------------------------------------------------
    FROM node:16-alpine AS build

    # Create app directory
    WORKDIR /app
    
    # Copy package.json and package-lock.json first for caching
    COPY package*.json ./
    
    # Install dependencies
    RUN npm install
    
    # Copy the rest of the app's source code
    COPY . .
    
    # Build the production files
    RUN npm run build
    
    
    # -------------------------------------------------------
    # Stage 2: Serve the app with Nginx
    # -------------------------------------------------------
    FROM nginx:alpine
    
    # Remove default Nginx website config (optional, if you have your own config)
    # RUN rm /etc/nginx/conf.d/default.conf
    
    # Copy compiled Vue.js build artifacts from the build stage
    COPY --from=build /app/dist /usr/share/nginx/html
    
    # (Optional) If you have a custom Nginx config, uncomment and adjust:
    # COPY nginx.conf /etc/nginx/conf.d/default.conf
    
    # Expose port 80
    EXPOSE 80
    
    # Launch Nginx in the foreground
    ENTRYPOINT ["nginx", "-g", "daemon off;"]
    
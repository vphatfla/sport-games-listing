# Use the official MongoDB image
FROM mongo:latest

# Copy the initialization script to Docker's entrypoint directory
COPY init-mongo.js /docker-entrypoint-initdb.d/

# Expose the default MongoDB port
EXPOSE 27017


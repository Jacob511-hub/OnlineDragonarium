# Use the official Node.js image as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Copy .pem into src folder
COPY src/us-east-2-bundle.pem /app/src/us-east-2-bundle.pem

# Build TypeScript to JavaScript
RUN npm run build

# Copy .pem into dist folder
RUN cp /app/src/us-east-2-bundle.pem /app/dist/us-east-2-bundle.pem

# Expose the port the app runs on
EXPOSE 5000

# Define the command to run the application
CMD ["npm", "start"]
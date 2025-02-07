#!/bin/bash

# Create a package.json file if not present
if [ ! -f "package.json" ]; then
  echo "Initializing npm project..."
  npm init -y
fi

# Install dependencies with legacy peer deps
echo "Installing dependencies..."
npm install --legacy-peer-deps \
  @reduxjs/toolkit@^1.9.1 \
  @tsndr/cloudflare-worker-jwt@^2.1.3 \
  @types/react-dom@^18.0.9 \
  bcryptjs@^2.4.3 \
  dotenv@^16.4.7 \
  echarts@^5.5.1 \
  emailjs-com@^3.2.0 \
  eslint@^8.28.0 \
  eslint-config-next@^13.0.4 \
  i18next@^24.0.5 \
  i18next-browser-languagedetector@^8.0.0 \
  i18next-http-backend@^3.0.1 \
  jsonwebtoken@^9.0.2 \
  mongodb@^6.11.0 \
  next@^13.5.7 \
  next-auth@^4.17.0 \
  react@^18.3.1 \
  react-bootstrap@^2.6.0 \
  react-dom@^18.3.1 \
  react-i18next@^15.1.3 \
  react-query@^3.39.2 \
  react-redux@^8.0.5 \
  scss@^0.2.4

# Check for successful installation
if [ $? -eq 0 ]; then
  echo "Dependencies installed successfully!"
else
  echo "An error occurred while installing dependencies."
fi


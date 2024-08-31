# # Use the official Node.js image
# FROM node:18 as base
# WORKDIR /usr/src/app

# # Install dependencies
# FROM base AS install
# COPY package.json package-lock.json ./
# RUN npm ci

# # Build the application
# FROM install AS build
# COPY . .
# RUN npm run build

# # Production image
# FROM node:18-alpine
# WORKDIR /usr/src/app
# COPY --from=install /usr/src/app/node_modules ./node_modules
# COPY --from=build /usr/src/app/dist ./dist
# COPY package.json ./

# # Run the app
# USER node
# EXPOSE 3000
# CMD ["npm", "run", "start:prod"]
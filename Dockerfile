FROM node:22-alpine AS frontend-build

WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm ci

COPY frontend ./
RUN npm run build



FROM node:22-alpine AS backend-deps

WORKDIR /app/backend

COPY backend/package*.json ./
RUN npm ci --omit=dev


FROM node:22-alpine AS production

ENV NODE_ENV=production
WORKDIR /app/backend

COPY --from=backend-deps /app/backend/node_modules ./node_modules
COPY backend ./
COPY --from=frontend-build /app/frontend/dist ./public

RUN mkdir -p uploads logs

EXPOSE 5000

CMD ["node", "src/server.js"]





# to Run:
# docker run --name ratemystore-app  -p 5000:5000  -e MONGO_URI=  -e JWT_SECRET= -e JWT_EXPIRES_IN="7d" -v "${PWD}/backend/uploads:/app/backend/uploads" ratemystore


# From the project root:

# docker build -t ratemystore .

# Run it with your MongoDB connection string and JWT secret:

# docker run --name ratemystore-app `
#   -p 5000:5000 `
#   -e MONGO_URI="your_mongodb_connection_string" `
#   -e JWT_SECRET="your_jwt_secret" `
#   -e JWT_EXPIRES_IN="7d" `
#   ratemystore
# Then open:

# http://localhost:5000

# API health check:

# http://localhost:5000/api/health

# Useful commands:

# docker logs -f ratemystore-app
# docker stop ratemystore-app
# docker rm ratemystore-app


# For uploaded images to persist after container removal, run with a volume:

# docker run --name ratemystore-app `
#   -p 5000:5000 `
#   -e MONGO_URI="your_mongodb_connection_string" `
#   -e JWT_SECRET="your_jwt_secret" `
#   -v "${PWD}\backend\uploads:/app/backend/uploads" `
#   ratemystore
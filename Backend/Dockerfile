# Backend (Node + Express)
FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --omit=dev || npm install --omit=dev

# Copy source
COPY . .

ENV NODE_ENV=production
ENV PORT=8000
EXPOSE 8000

# Lightweight container health check hitting Express readiness endpoint.
# If the app fails or stops responding, Docker will mark container unhealthy.
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 CMD wget -qO- http://localhost:8000/api/v1/health || exit 1

CMD ["node", "index.js"]

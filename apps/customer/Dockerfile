# Use a lightweight Node.js Linux image as our base
FROM node:22-alpine AS base


# -----------------------------
# Dependencies stage
# -----------------------------

# Create the working directory inside the container
FROM base AS deps
WORKDIR /app

# Copy root package metadata so npm understands the workspace
COPY package.json package-lock.json ./

# Copy Customer's package metadata
COPY apps/customer/package.json ./apps/customer/package.json

# Copy shared package metadata required by Customer
COPY packages/types/package.json ./packages/types/package.json
COPY packages/ui/package.json ./packages/ui/package.json

# Install the exact npm version required by our monorepo
RUN npm install -g npm@11.19.0

# Install the monorepo dependencies
RUN npm ci


# -----------------------------
# Build stage
# -----------------------------

# Create the application build environment
FROM base AS builder
WORKDIR /app

# Use the same npm version required by the monorepo
RUN npm install -g npm@11.19.0

# Reuse the dependencies installed in the previous stage
COPY --from=deps /app/node_modules ./node_modules

# Copy the complete monorepo source needed for the build
COPY . .

# Build only the Customer Next.js application
RUN npm run build --workspace=customer


# -----------------------------
# Production runtime stage
# -----------------------------

# Start from a clean lightweight Node.js image
FROM base AS runner
WORKDIR /app

# Tell Next.js that this is a production environment
ENV NODE_ENV=production

# Copy Next.js standalone server generated during the build
COPY --from=builder /app/apps/customer/.next/standalone ./

# Copy static Next.js assets required by the application
COPY --from=builder /app/apps/customer/.next/static ./apps/customer/.next/static

# Copy public assets used by the Customer application
COPY --from=builder /app/apps/customer/public ./apps/customer/public

# Document that the container listens on port 3000
EXPOSE 3000

# Start the standalone Next.js production server
CMD ["node", "apps/customer/server.js"]
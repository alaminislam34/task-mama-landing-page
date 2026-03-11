# FROM node:20-alpine AS deps
# WORKDIR /app
# RUN npm install -g pnpm
# COPY package.json pnpm-lock.yaml* ./
# RUN pnpm install

# FROM deps AS builder
# ARG NEXT_PUBLIC_APP_URL
# ARG NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
# ARG NEXT_PUBLIC_GOOGLE_CLIENT_ID

# ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL
# ENV NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=$NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
# ENV NEXT_PUBLIC_GOOGLE_CLIENT_ID=$NEXT_PUBLIC_GOOGLE_CLIENT_ID

# COPY . .
# RUN pnpm build

# FROM deps AS dev
# WORKDIR /app
# COPY . .
# CMD ["pnpm", "dev", "--hostname", "0.0.0.0"]

# FROM node:20-alpine AS runner
# WORKDIR /app
# RUN npm install -g pnpm
# COPY --from=builder /app ./
# EXPOSE 3000
# CMD ["pnpm", "start"]

# Install dependencies
FROM node:20-alpine AS deps
WORKDIR /app
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
RUN npm install -g pnpm

ARG NEXT_PUBLIC_APP_URL
ARG NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
ARG NEXT_PUBLIC_GOOGLE_CLIENT_ID

ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL
ENV NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=$NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
ENV NEXT_PUBLIC_GOOGLE_CLIENT_ID=$NEXT_PUBLIC_GOOGLE_CLIENT_ID

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN pnpm build

# Production runner
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN npm install -g pnpm

COPY --from=builder /app/package.json ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["pnpm", "start"]

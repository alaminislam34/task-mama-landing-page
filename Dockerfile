FROM node:20-alpine AS builder
WORKDIR /app
# pnpm ইনস্টল করা (যেহেতু আপনি pnpm ইউজ করেন)
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install
COPY . .
RUN pnpm build

FROM node:20-alpine AS runner
WORKDIR /app
RUN npm install -g pnpm
COPY --from=builder /app ./
EXPOSE 3000
CMD ["pnpm", "start"]
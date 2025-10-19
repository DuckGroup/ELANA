FROM oven/bun:1.2

WORKDIR /app

# Copy package.json and install dependencies
COPY package.json .
COPY bun.lockb .
RUN bun install

# Copy prisma schema and generate client
COPY prisma ./prisma/
RUN bunx prisma generate

# Copy the rest of the application
COPY . .

# Build the application
RUN bun run build

# Environment variables
ENV PORT=3012
ENV NODE_ENV=production

EXPOSE 3012

CMD ["bun", "start"]
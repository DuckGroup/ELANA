FROM oven/bun:1.2

WORKDIR /app
COPY package.json .
COPY prisma ./prisma/
RUN bun install

# Generate Prisma client
RUN bunx prisma generate

COPY . .
RUN bun run build

ENV NODE_ENV=production

EXPOSE 3000
CMD ["bun", "start"]
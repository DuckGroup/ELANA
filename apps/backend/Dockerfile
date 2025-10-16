FROM oven/bun:1.2

WORKDIR /app
COPY package.json .
COPY prisma ./prisma/
RUN bun install

# Generate Prisma client
RUN bunx prisma generate

COPY . .
RUN bun run build

EXPOSE 3012
CMD ["bun", "start"]
FROM oven/bun:1.2

WORKDIR /app
COPY package.json .
RUN bun install

COPY . .
RUN bun run build

EXPOSE 3012
CMD ["bun", "start"]
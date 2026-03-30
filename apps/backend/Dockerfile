FROM oven/bun:1.2

WORKDIR /app

COPY package.json bun.lockb* ./

COPY prisma ./prisma/

RUN bun install

RUN bunx prisma generate

COPY . .

ENV NODE_ENV=production

EXPOSE 3012

CMD ["bun", "run", "index.ts"]
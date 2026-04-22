# ============================================
# Stage 1: Dependencies
# ============================================
FROM oven/bun:1 AS dependencies
WORKDIR /app
COPY package.json bun.lock* ./
# frozen-lockfileで環境を固定
RUN bun install --frozen-lockfile

# ============================================
# Stage 2: Builder
# ============================================
FROM oven/bun:1 AS builder
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

# 環境変数の注入（ビルド時に必要なもの）
ENV NODE_ENV=production
# Next.jsとしてビルドを実行
RUN bun run build

# ============================================
# Stage 3: Runner
# ============================================
FROM oven/bun:1 AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
# IPv6対応のための設定
ENV HOSTNAME="::"

# Next.js standaloneモードの成果物をコピー
# ※ package.json の scripts.build が "next build" である必要があります
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# コンテンツ（Markdown等）のコピー
COPY --from=builder /app/posts ./posts
COPY --from=builder /app/content ./content

USER bun
EXPOSE 3000

# Standaloneモードで生成された server.js を起動
CMD ["bun", "server.js"]
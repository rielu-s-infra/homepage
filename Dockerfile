# ============================================
# Stage 1: Dependencies Installation Stage
# ============================================

# This Dockerfile.bun is specifically configured for projects using Bun
# For npm/pnpm or yarn, refer to the Dockerfile instead

FROM oven/bun:1 AS dependencies

# Set working directory
WORKDIR /app

# Copy package-related files first to leverage Docker's caching mechanism
COPY package.json bun.lock* ./

# Install project dependencies with frozen lockfile for reproducible builds
RUN --mount=type=cache,target=/root/.bun/install/cache \
    bun install --no-save --frozen-lockfile

# ============================================
# Stage 2: Build Next.js application in standalone mode
# ============================================

FROM oven/bun:1 AS builder

# Set working directory
WORKDIR /app

# Copy project dependencies from dependencies stage
COPY --from=dependencies /app/node_modules ./node_modules

# Copy application source code
COPY . .

ENV DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy"

# Generate Prisma client
# RUN bun x prisma generate

ENV NODE_ENV=production

# Install git to allow Next.js to detect the repository and enable features like Fast Refresh
RUN apt update && apt install -y git

# Remove apt cache to reduce image size
RUN rm -rf /var/lib/apt/lists/*

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED=1

# Build Next.js application
RUN bun run build

# ============================================
# Stage 3: Run Next.js application
# ============================================

FROM oven/bun:1 AS runner

# 作業ディレクトリを /app に固定
WORKDIR /app

# 環境変数の設定
ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=::
ENV HOSTNAME="::"

# 1. standalone の「中身」を /app 直下にコピー
# (これによって /app/server.js が配置されます)
COPY --from=builder --chown=bun:bun /app/.next/standalone ./

# 2. public フォルダを /app/public にコピー
# (server.js と同じ階層にある必要があります)
COPY --from=builder --chown=bun:bun /app/public ./public

# 3. static フォルダを /app/.next/static にコピー
COPY --from=builder --chown=bun:bun /app/.next/static ./.next/static

# ユーザー切り替え
USER bun

# ポート開放
EXPOSE 3000

# server.js は /app 直下にあるので、そのまま実行
CMD ["bun", "server.js"]
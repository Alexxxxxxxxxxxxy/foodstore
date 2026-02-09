# backend/Dockerfile
FROM node:20-alpine AS builder

WORKDIR /app

# 复制 package.json 和 tsconfig.json
COPY package*.json ./
COPY tsconfig.json ./

# 安装所有依赖（包括开发依赖）
RUN npm ci

# 复制源代码
COPY . .

# 编译TypeScript代码
RUN npm run build

# 生产环境镜像
FROM node:20-alpine

WORKDIR /app

# 复制 package.json
COPY package*.json ./

# 安装只生产依赖
RUN npm ci --only=production

# 复制编译后的代码
COPY --from=builder /app/dist/ ./dist/

# 复制必要文件
COPY .env ./
COPY uploads/ ./uploads/

# 创建uploads目录（如果不存在）
RUN mkdir -p uploads

EXPOSE 8000

# 启动应用
CMD ["node", "dist/index.js"]
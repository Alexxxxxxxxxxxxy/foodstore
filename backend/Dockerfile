# backend/Dockerfile
FROM node:latest

WORKDIR /app

# 复制 package.json
COPY package*.json ./

# 安装依赖
RUN npm ci --only=production  # 只安装生产依赖，更快更安全

# 复制编译后的代码
COPY dist/ ./dist/

# 如果需要，复制其他必要文件
# COPY .env ./
# COPY uploads/ ./uploads/

EXPOSE 8000

# 启动应用
CMD ["node", "dist/index.js"]
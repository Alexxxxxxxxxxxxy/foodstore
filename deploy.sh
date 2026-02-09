#!/bin/bash

# 部署脚本 - 阿里云Ubuntu服务器部署完整项目

echo "开始部署项目..."

# 1. 更新系统包
echo "更新系统包..."
sudo apt update && sudo apt upgrade -y

# 2. 安装必要的依赖
echo "安装必要的依赖..."
sudo apt install -y apt-transport-https ca-certificates curl gnupg-agent software-properties-common

# 3. 安装Docker
echo "安装Docker..."
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io

# 4. 安装Docker Compose
echo "安装Docker Compose..."
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# 5. 克隆项目代码（如果还没有）
if [ ! -d "foodstore" ]; then
    echo "克隆项目代码..."
    git clone https://github.com/yourusername/foodstore.git
    cd foodstore
else
    echo "项目目录已存在，更新代码..."
    cd foodstore
    git pull
fi

# 6. 构建前端和管理后台
echo "构建前端..."
cd frontend
sudo npm install
sudo npm run build
cd ..

echo "构建管理后台..."
cd admin
sudo npm install
sudo npm run build
cd ..

# 7. 创建环境变量文件
echo "创建环境变量文件..."
cp backend/.env.example backend/.env
# 注意：这里需要根据实际情况修改.env文件中的配置

# 8. 构建和启动Docker容器
echo "构建和启动Docker容器..."
sudo docker-compose up -d --build

# 9. 配置SSL证书（使用Let's Encrypt）
echo "配置SSL证书..."
sudo apt install -y certbot python3-certbot-nginx
# 注意：这里需要根据实际域名运行certbot命令
# sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# 10. 重启Nginx
echo "重启Nginx..."
sudo docker-compose restart nginx

# 11. 查看服务状态
echo "查看服务状态..."
sudo docker-compose ps

echo "部署完成！项目已成功部署到阿里云服务器。"
echo "请访问 https://yourdomain.com 查看网站。"

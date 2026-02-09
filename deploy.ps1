# 部署脚本 - 阿里云Ubuntu服务器部署完整项目（PowerShell版本）

Write-Host "开始部署项目..." -ForegroundColor Green

# 1. 更新系统包
Write-Host "更新系统包..." -ForegroundColor Cyan
sudo apt update && sudo apt upgrade -y

# 2. 安装必要的依赖
Write-Host "安装必要的依赖..." -ForegroundColor Cyan
sudo apt install -y apt-transport-https ca-certificates curl gnupg-agent software-properties-common

# 3. 安装Docker
Write-Host "安装Docker..." -ForegroundColor Cyan
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io

# 4. 安装Docker Compose
Write-Host "安装Docker Compose..." -ForegroundColor Cyan
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# 5. 克隆项目代码（如果还没有）
if (-Not (Test-Path "foodstore" -PathType Container)) {
    Write-Host "克隆项目代码..." -ForegroundColor Cyan
    git clone https://github.com/yourusername/foodstore.git
    cd foodstore
} else {
    Write-Host "项目目录已存在，更新代码..." -ForegroundColor Cyan
    cd foodstore
    git pull
}

# 6. 构建前端和管理后台
Write-Host "构建前端..." -ForegroundColor Cyan
cd frontend
sudo npm install
sudo npm run build
cd ..

Write-Host "构建管理后台..." -ForegroundColor Cyan
cd admin
sudo npm install
sudo npm run build
cd ..

# 7. 创建环境变量文件
Write-Host "创建环境变量文件..." -ForegroundColor Cyan
cp backend/.env.example backend/.env
# 注意：这里需要根据实际情况修改.env文件中的配置

# 8. 构建和启动Docker容器
Write-Host "构建和启动Docker容器..." -ForegroundColor Cyan
sudo docker-compose up -d --build

# 9. 配置SSL证书（使用Let's Encrypt）
Write-Host "配置SSL证书..." -ForegroundColor Cyan
sudo apt install -y certbot python3-certbot-nginx
# 注意：这里需要根据实际域名运行certbot命令
# sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# 10. 重启Nginx
Write-Host "重启Nginx..." -ForegroundColor Cyan
sudo docker-compose restart nginx

# 11. 查看服务状态
Write-Host "查看服务状态..." -ForegroundColor Cyan
sudo docker-compose ps

Write-Host "部署完成！项目已成功部署到阿里云服务器。" -ForegroundColor Green
Write-Host "请访问 https://yourdomain.com 查看网站。" -ForegroundColor Green

#!/bin/bash

# 测试脚本 - 验证部署结果

echo "开始测试部署结果..."

# 1. 测试服务状态
echo "测试服务状态..."
docker-compose ps

# 2. 测试数据库连接
echo "测试数据库连接..."
docker exec -it foodstore_mongodb_1 mongo --eval "db.adminCommand('ping')"

# 3. 测试后端API
echo "测试后端API..."

# 测试食物列表API
response=$(curl -s http://localhost/api/food/list)
if [ $? -eq 0 ]; then
    echo "✓ 食物列表API测试通过"
    echo "返回数据: $response"
else
    echo "✗ 食物列表API测试失败"
fi

# 测试用户登录API（使用测试账号）
# response=$(curl -s -X POST http://localhost/api/user/login -H "Content-Type: application/json" -d '{"email":"test@example.com","password":"password123"}')
# if [ $? -eq 0 ]; then
#     echo "✓ 用户登录API测试通过"
#     echo "返回数据: $response"
#else
#     echo "✗ 用户登录API测试失败"
# fi

# 4. 测试前端页面加载
echo "测试前端页面加载..."

# 测试主页面
response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost)
if [ $response -eq 200 ] || [ $response -eq 301 ] || [ $response -eq 302 ]; then
    echo "✓ 主页面测试通过（HTTP状态码: $response）"
else
    echo "✗ 主页面测试失败（HTTP状态码: $response）"
fi

# 测试管理后台页面
response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost/admin)
if [ $response -eq 200 ] || [ $response -eq 301 ] || [ $response -eq 302 ]; then
    echo "✓ 管理后台页面测试通过（HTTP状态码: $response）"
else
    echo "✗ 管理后台页面测试失败（HTTP状态码: $response）"
fi

# 5. 测试HTTPS访问
echo "测试HTTPS访问..."

# 注意：这里需要根据实际域名修改
# response=$(curl -s -k -o /dev/null -w "%{http_code}" https://yourdomain.com)
# if [ $response -eq 200 ]; then
#     echo "✓ HTTPS访问测试通过"
#else
#     echo "✗ HTTPS访问测试失败"
# fi

# 6. 测试文件上传功能
echo "测试文件上传功能..."

# 注意：这里需要根据实际API端点修改
# response=$(curl -s -X POST http://localhost/api/upload -F "file=@test.jpg")
# if [ $? -eq 0 ]; then
#     echo "✓ 文件上传功能测试通过"
#else
#     echo "✗ 文件上传功能测试失败"
# fi

# 7. 测试负载能力
echo "测试负载能力..."

# 使用ab工具进行简单的负载测试（如果已安装）
if command -v ab &> /dev/null; then
    echo "执行负载测试..."
    ab -n 100 -c 10 http://localhost/api/food/list
else
    echo "ab工具未安装，跳过负载测试"
fi

echo "测试完成！请根据测试结果检查系统状态。"

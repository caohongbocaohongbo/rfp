#!/bin/bash

# 酒店RFP招标平台 - 本地服务器启动脚本

echo "========================================="
echo "酒店RFP招标平台 - 本地开发服务器"
echo "========================================="
echo ""

# 检查项目文件
echo "📂 检查项目文件..."
if [ ! -f "index.html" ]; then
    echo "❌ 错误：未找到index.html文件"
    echo "   请确保在正确的项目目录下运行此脚本"
    exit 1
fi

# 检查图片资源
if [ ! -d "rfp-assets" ]; then
    echo "❌ 错误：未找到rfp-assets图片目录"
    exit 1
fi

echo "✅ 项目文件检查完成"
echo "   - 主页: index.html"
echo "   - 开始使用: start-using.html"
echo "   - 了解更多: learn-more.html"
echo "   - 解决方案: solutions.html"
echo "   - 图片资源: rfp-assets/ ($(ls rfp-assets/ | wc -l | awk '{print $1}') 个文件)"
echo ""

# 选择启动方式
echo "🚀 选择启动方式："
echo "   1) Python 3 (推荐)"
echo "   2) Python 2"
echo "   3) Node.js http-server"
echo "   4) PHP内置服务器"
echo "   5) 仅显示访问信息"
echo ""
read -p "请选择 (1-5): " choice

case $choice in
    1)
        echo "📦 使用Python 3启动服务器..."
        python3 -m http.server 8000 &
        ;;
    2)
        echo "📦 使用Python 2启动服务器..."
        python -m SimpleHTTPServer 8000 &
        ;;
    3)
        echo "📦 使用Node.js http-server启动服务器..."
        if command -v npx &> /dev/null; then
            npx http-server -p 8000 &
        else
            echo "❌ 未安装Node.js或npx"
            echo "   请安装Node.js后重试，或选择其他选项"
        fi
        ;;
    4)
        echo "📦 使用PHP内置服务器启动服务器..."
        if command -v php &> /dev/null; then
            php -S localhost:8000 &
        else
            echo "❌ 未安装PHP"
            echo "   请安装PHP后重试，或选择其他选项"
        fi
        ;;
    5)
        echo "📋 显示访问信息..."
        ;;
    *)
        echo "❌ 无效选择，使用Python 3启动服务器..."
        python3 -m http.server 8000 &
        ;;
esac

echo ""
echo "========================================="
echo "🎉 服务器启动成功！"
echo "========================================="
echo ""
echo "📱 访问地址："
echo "   主页: http://localhost:8000/index.html"
echo "   或: http://localhost:8000/ (自动跳转到首页)"
echo ""
echo "📄 其他页面："
echo "   开始使用: http://localhost:8000/start-using.html"
echo "   了解更多: http://localhost:8000/learn-more.html"
echo "   解决方案: http://localhost:8000/solutions.html"
echo ""
echo "💡 提示："
echo "   - 在浏览器中打开上述地址即可预览"
echo "   - 使用Ctrl+C停止服务器（如果在终端运行）"
echo "   - 修改HTML文件后刷新浏览器即可看到变更"
echo ""
echo "========================================="

# 等待用户输入（保持服务器运行）
if [ "$choice" != "5" ]; then
    echo "按Enter键停止服务器..."
    read
    echo ""
    echo "🛑 服务器已停止"
fi
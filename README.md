# 快手无水印视频下载器 📱

这是一个功能强大且易于使用的快手视频下载工具。它能够自动提取视频源地址并下载无水印原始视频，支持进度显示和断点续传。本工具采用最新的 Bun 运行时和 Puppeteer 技术，确保下载速度快且稳定。无论是普通视频还是直播回放，都能轻松下载保存。

得益于智能的视频源提取算法和防屏蔽机制，下载的视频都是原始质量，没有任何水印、台标或清晰度损失。对于重度快手用户和内容创作者来说，这是一个必备的视频素材管理工具。

## ✨ 特性

- 🎯 支持无水印下载快手视频
- 🚀 使用 Bun 运行时，下载速度快
- 💻 简单的命令行界面
- 📁 自动创建下载目录
- 📊 实时显示下载进度
- 🛡️ 稳定可靠的下载体验

## 🔧 安装

确保您的系统已安装 [Bun](https://bun.sh) 运行环境和 Chrome 浏览器，然后执行：

```bash
# 安装依赖
bun install
````

## 📖 使用方法

```bash
# 下载视频
bun start <快手视频链接>

# 查看帮助信息
bun start --help

# 示例
bun start https://v.kuaishou.com/xxxx
```
## 命令行参数说明
```bash
Usage: 快手视频下载器 [options] <url>

下载快手视频的命令行工具

使用方法:
$ bun start <视频链接>

示例:
$ bun start https://v.kuaishou.com/xxxx

注意事项:

- 链接必须是快手平台的有效视频链接
- 如果链接包含特殊字符，请使用引号包裹

Arguments:
url 快手视频链接 (必填)

Options:
-V, --version 显示版本号
-h, --help 显示帮助信息
```

## 🎯 使用提示

1. 确保提供的是有效的快手视频链接
2. 下载的视频将保存在 `download` 目录中
3. 需要稳定的网络连接
4. 如果遇到问题，请确保 Chrome 浏览器已正确安装

## ⚠️ 注意事项

- 本工具仅供学习交流使用
- 请勿用于任何商业用途
- 请遵守相关法律法规
- 注意视频版权问题

## 🔄 更新日志

### v1.0.0

- ✨ 首次发布
- 🎯 支持无水印下载
- 📊 添加下载进度显示

## 📺 演示效果

<div align="center">
<img src="./demo.png" width="800" />
<br />
<em>命令行下载演示</em>
</div>

### 特点展示

1. 🎯 **无水印下载**
   - 直接获取原始视频源
   - 清晰度无损失
   - 无任何水印叠加

2. 📊 **实时进度**
   - 显示下载百分比
   - 显示文件大小
   - 显示传输速度

3. 💻 **简单操作**
   - 一行命令完成下载
   - 自动创建下载目录
   - 智能命名保存

### 个人捐赠支持

如果您认为该项目对您有所帮助，并且愿意个人捐赠以支持其持续发展和维护，🥰 我非常感激您的慷慨。
您的捐赠将帮助我继续改进和添加新功能到该项目中。 通过财务捐赠，您将有助于确保该项目保持免
费和对所有人开放。即使是一小笔捐款也能产生巨大的影响，也是对我个人的鼓励。

## 支持项目 💝

感谢您对华佗 AI 项目的关注！您的支持将帮助我们持续改进项目，为中医药发展贡献力量。

### 国内支付方式

<div align="center">
<table>
<tr>
<td align="center" width="300">
<img src="https://github.com/ctkqiang/ctkqiang/blob/main/assets/IMG_9863.jpg?raw=true" width="200" />
<br />
<strong>微信支付</strong>
</td>
<td align="center" width="300">
<img src="https://github.com/ctkqiang/ctkqiang/blob/main/assets/IMG_9859.JPG?raw=true" width="200" />
<br />
<strong>支付宝</strong>
</td>
</tr>
</table>
</div>

### 国际支付渠道

<div align="center">

[![支付宝](https://img.shields.io/badge/支付宝-捐赠-00A1E9?style=for-the-badge&logo=alipay&logoColor=white)](https://qr.alipay.com/fkx19369scgxdrkv8mxso92)
[![Ko-fi](https://img.shields.io/badge/Ko--fi-赞助-FF5E5B?style=for-the-badge&logo=ko-fi&logoColor=white)](https://ko-fi.com/F1F5VCZJU)
[![PayPal](https://img.shields.io/badge/PayPal-支持-00457C?style=for-the-badge&logo=paypal&logoColor=white)](https://www.paypal.com/paypalme/ctkqiang)
[![Stripe](https://img.shields.io/badge/Stripe-捐赠-626CD9?style=for-the-badge&logo=Stripe&logoColor=white)](https://donate.stripe.com/00gg2nefu6TK1LqeUY)

</div>

### 关注作者

<div align="center">

#### 专业平台

[![GitHub](https://img.shields.io/badge/GitHub-开源项目-24292e?style=for-the-badge&logo=github)](https://github.com/ctkqiang)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-职业经历-0077b5?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/ctkqiang/)
[![Stack Overflow](https://img.shields.io/badge/Stack_Overflow-技术交流-f48024?style=for-the-badge&logo=stackoverflow)](https://stackoverflow.com/users/10758321/%e9%92%9f%e6%99%ba%e5%bc%ba)

#### 社交媒体

[![Facebook](https://img.shields.io/badge/Facebook-社交平台-1877F2?style=for-the-badge&logo=facebook)](https://www.facebook.com/JohnMelodyme/)
[![Instagram](https://img.shields.io/badge/Instagram-生活分享-E4405F?style=for-the-badge&logo=instagram)](https://www.instagram.com/ctkqiang)
[![Twitch](https://img.shields.io/badge/Twitch-直播频道-9146FF?style=for-the-badge&logo=twitch)](https://twitch.tv/ctkqiang)

[![](https://img.shields.io/badge/GitHub-项目仓库-24292F?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ctkqiang)
[![](https://img.shields.io/badge/微信公众号-华佗AI-07C160?style=for-the-badge&logo=wechat&logoColor=white)](https://github.com/ctkqiang/ctkqiang/blob/main/assets/IMG_9245.JPG?raw=true)

</div>

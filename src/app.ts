import { Command } from 'commander'
import { downloadKuaishouVideo, play_video } from './downloader'

/**
 * 快手视频下载器命令行界面 📱
 *
 * 本模块实现了命令行交互界面，用于处理用户输入和控制视频下载流程。
 *
 * 核心功能：
 * 1. 🎮 命令行参数解析
 *    - 支持视频链接输入
 *    - 提供帮助信息
 *    - 错误处理机制
 *
 * 2. 🔄 工作流程
 *    - 验证输入参数
 *    - 调用下载模块
 *    - 显示下载进度
 *    - 错误反馈
 *
 * 3. 🎯 使用说明
 *    - 支持快手平台视频链接
 *    - 自动处理特殊字符
 *    - 提供友好的错误提示
 *
 * 4. 💡 特别说明
 *    - 使用 commander 处理命令行
 *    - 采用异步操作确保性能
 *    - 优雅的错误处理
 *    - 清晰的使用引导
 *
 * 使用示例：
 * ```bash
 * bun start https://v.kuaishou.com/xxxx   # 下载单个视频
 * bun start --help                        # 显示帮助信息
 * ```
 *
 * 注意事项：
 * - 需要有效的快手视频链接
 * - 确保网络连接稳定
 * - 注意磁盘空间充足
 *
 * @作者 钟智强 <johnmelodymel@qq.com>
 * @版本 1.0.0
 * @许可 MIT
 */

const program = new Command()

program
  .name('快手视频下载器')
  .description(
    `下载快手视频的命令行工具

使用方法:
  $ bun start <视频链接>

示例:
  $ bun start https://v.kuaishou.com/xxxx

注意事项:
  - 链接必须是快手平台的有效视频链接
  - 如果链接包含特殊字符，请使用引号包裹`
  )
  .version('1.0.0')
  .showHelpAfterError(
    `
提示：使用 --help 查看详细使用说明
示例：bun start --help`
  )
  .exitOverride()

try {
  program
    .argument('<url>', '快手视频链接 (必填)')
    .action(async (url: string) => {
      try {
        // 这里将添加快手视频下载的主要逻辑，包括视频信息提取和下载功能的实现
        await downloadKuaishouVideo(url)

        console.log('视频下载成功！')
      } catch (error) {
        console.error('视频下载出错：', error.message)
      }
    })

  program.parse(process.argv)
} catch (err) {
  console.error('\n错误：缺少必需的参数 "视频链接"\n')
  console.error('正确用法：bun start <视频链接>')
  console.error('示例：bun start https://v.kuaishou.com/xxxx\n')
  process.exit(1)
}

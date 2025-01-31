import { Command } from 'commander'
import { downloadKuaishouVideo, play_video } from './downloader'

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

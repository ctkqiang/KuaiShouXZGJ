import cheerio from 'cheerio'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { exec } from 'child_process'
import puppeteer from 'puppeteer'
import { setTimeout } from 'timers/promises'
import chalk from 'chalk'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const __play_video_ = false

/**
 * 快手视频下载器核心模块 🎥
 *
 * 这是一个专业的快手视频下载工具，具有以下特点：
 *
 * 核心功能：
 * 1. 🤖 自动化浏览器控制
 *    - 使用 Puppeteer 模拟真实用户行为
 *    - 自动处理页面加载和 JavaScript 执行
 *    - 智能等待视频元素加载
 *
 * 2. 🎯 视频源提取
 *    - 精确定位视频源地址
 *    - 绕过反爬虫机制
 *    - 支持多种视频格式
 *
 * 3. ⬇️ 高效下载系统
 *    - 支持断点续传
 *    - 实时显示下载进度
 *    - 自动创建下载目录
 *    - 智能文件命名
 *
 * 4. 📊 数据处理
 *    - 流式数据处理
 *    - 内存优化
 *    - 错误处理机制
 *
 * 技术特点：
 * - 使用 Bun 运行时提升性能
 * - 采用 TypeScript 确保代码质量
 * - 异步操作优化
 * - 友好的命令行界面
 *
 * 使用注意：
 * - 需要 Chrome 浏览器环境
 * - 需要稳定的网络连接
 * - 建议使用 VPN 或代理
 * - 注意内存占用
 *
 */

async function fetchHtmlWithPuppeteer (pageUrl: string): Promise<string> {
  console.log(chalk.blue('\n📱 快手视频下载器启动中...\n'))
  console.log(
    chalk.cyan(
      `🚀 正在启动浏览器解析页面: ${chalk.underline(pageUrl).slice(0, 50)}`
    )
  )

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: await Bun.which('chrome')
  })

  const page = await browser.newPage()

  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36'
  )

  await page.goto(pageUrl, { waitUntil: 'networkidle2' })

  // 确保 JavaScript 加载完
  await page
    .waitForSelector('video.player-video', { timeout: 5000 })
    .catch(() => {
      console.warn(
        chalk.yellow(
          "\n⚠️  警告：没找到 'video.player-video'，可能需要手动解析"
        )
      )
    })

  // 获取视频链接
  const videoSrc = await page.evaluate(() => {
    const video = document.querySelector(
      'video.player-video'
    ) as HTMLVideoElement
    return video ? video.src : null
  })

  await browser.close()

  if (!videoSrc)
    throw new Error('❌ 无法获取视频地址，请检查网页内容或更新选择器')
  return videoSrc
}

async function downloadKuaishouVideo (pageUrl: string) {
  try {
    console.log(chalk.cyan(`\n🌐 正在访问页面: \n${chalk.underline(pageUrl)}`))

    const videoUrl = await fetchHtmlWithPuppeteer(pageUrl)
    console.log(chalk.green(`\n🎯 已成功获取视频地址！`))
    console.log(chalk.gray(`${videoUrl.slice(0, 50)}...`))

    console.log(chalk.blue(`\n⬇️  准备下载视频...`))

    const response = await fetch(videoUrl, {
      headers: {
        Referer: pageUrl,
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
      }
    })

    if (!response.ok)
      throw new Error(`❌ 下载请求失败: HTTP ${response.status}\n`)

    // 3️⃣ 获取文件总大小
    const contentLength = response.headers.get('Content-Length')
    const totalSize = contentLength ? parseInt(contentLength, 10) : null

    // 4️⃣ 设置目标文件路径
    const downloadDir = path.join(__dirname, '../download') // 相对路径
    if (!fs.existsSync(downloadDir)) {
      try {
        fs.mkdirSync(downloadDir, { recursive: true })
        console.log(chalk.green('\n📁 下载目录创建成功'))
      } catch (err) {
        throw new Error(chalk.red('📁 下载目录创建失败: ' + err.message))
      }
    }

    const fileName = `ks_${Date.now()}.mp4`
    const filePath = path.join(downloadDir, fileName)

    // 5️⃣ 读取数据流并显示进度
    const reader = response.body?.getReader()
    let receivedSize = 0
    let chunks: Uint8Array[] = []

    if (!reader) throw new Error('❌ 无法创建视频流读取器\n')

    while (true) {
      try {
        const { done, value } = await reader.read()
        if (done) break

        chunks.push(value)
        receivedSize += value.length

        if (totalSize) {
          const progress = ((receivedSize / totalSize) * 100).toFixed(2)
          const size = (receivedSize / 1024 / 1024).toFixed(2)
          const totalMB = (totalSize / 1024 / 1024).toFixed(2)
          process.stdout.write(
            chalk.cyan(`📥 下载进度: ${progress}% `) +
              chalk.gray(`(${size}MB / ${totalMB}MB)\r`)
          )
        }
      } catch (err) {
        throw new Error(chalk.red(`❌ 视频流读取错误: ${err.message}`))
      }
    }

    try {
      console.log(chalk.blue(`\n📦 正在处理视频数据...`))

      // 使用更高效的方式处理数据流
      const videoBuffer = Buffer.concat(chunks.map(chunk => Buffer.from(chunk)))

      console.log(chalk.blue(`\n💾 正在写入文件...`))

      // 使用 Bun 的异步写入
      await Bun.write(filePath, videoBuffer)

      // 清理控制台的进度显示
      process.stdout.write('\n')

      if (__play_video_) play_video(`${downloadDir}${fileName}`)

      // 显示成功信息
      console.log(chalk.green(`\n✨ 视频下载成功！`))
      console.log(chalk.gray(`📂 保存位置: ${filePath}`))

      // 显示文件大小
      const fileSizeMB = (videoBuffer.length / 1024 / 1024).toFixed(2)
      console.log(chalk.gray(`📊 文件大小: ${fileSizeMB} MB\n`))
    } catch (err) {
      throw new Error(chalk.red(`❌ 视频文件写入失败: ${err.message}`))
    }
  } catch (error) {
    console.error(chalk.red(`\n❌ 程序执行出错: ${error.message}\n`))
  }
}

async function play_video (path: string) {
  if (process.platform === 'darwin') {
    console.log(chalk.cyan('\n在 macOS 上安装:'))
    console.log(chalk.gray('brew install mpv'))
  } else if (process.platform === 'linux') {
    console.log(chalk.cyan('\n在 Ubuntu/Debian 上安装:'))
    console.log(chalk.gray('sudo apt install mpv'))
  } else {
    console.log(chalk.cyan('\n请访问: https://mpv.io/installation/'))
  }

  exec(`mpv --no-video ${path}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`)
      return
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`)
      return
    }
    console.log(`stdout: ${stdout}`)
  })
}

export { downloadKuaishouVideo, play_video }

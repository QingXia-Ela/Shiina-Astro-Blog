/* eslint-disable no-undef */
import fs from 'fs'
import path from 'path'
import PostsPublicTime from '../utils/ParseTime.js'
import chalk from 'chalk'

const template = `---
title: {{title}}
date: ${PostsPublicTime(new Date())}
---
`

/**
 * 创建新文章
 * @param {string} title 文章标题
 */
export default function CreateNewBlog(title) {
  try {
    fs.writeFileSync(path.join(process.cwd(), './src/content/blog', title + '.md'), template.replace("{{title}}", title))
    console.log(`${chalk.bold.bgGreen(" SUCCESS ")} ${chalk.bold(`文章创建成功：${path.join(process.cwd(), './src/content/blog', title + '.md')}`)}`)
  } catch (e) {
    console.log(`${chalk.bold.bgRed(" ERROR ")} ${chalk.bold(`文章创建失败！错误信息：${e}`)}`)
  }
}
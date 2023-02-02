import type { AstroIntegration, BuildConfig } from "astro";
import fs from 'fs'
import path from 'path'
import MI from 'markdown-it'
import { fileURLToPath } from 'url'
import chalk from 'chalk'
import { logSuccess } from "../utils/ChalkTips";

/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 * @param extension 限制的扩展名
 * @param res 结果列表
 */
async function fileDisplay(filePath: string, extension: string[] = [], res: Set<string>) {
  return new Promise((resolve, reject) => {
    //根据文件路径读取文件，返回文件列表
    fs.readdir(filePath, function (err, files) {
      if (err) {
        reject(err)
      } else {
        //遍历读取到的文件列表
        files.forEach(function (filename) {
          //获取当前文件的绝对路径
          const filedir = path.join(filePath, filename);
          //根据文件路径获取文件信息，返回一个fs.Stats对象
          fs.stat(filedir, async function (err, stats) {
            if (err) {
              reject(err)
            } else {
              const isFile = stats.isFile();//是文件
              const isDir = stats.isDirectory();//是文件夹
              let regTest = false
              extension.length ? extension.forEach((v) => {
                if (new RegExp(v).test(filedir)) regTest = true
              }) : regTest = true
              if (isFile && regTest) {
                res.add(filedir)
              }
              if (isDir) {
                await fileDisplay(filedir, extension, res);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
              }
            }
          })
        });
      }
      resolve(res)
    });
  })
}

function subMarkdownTitle(path: string) {
  return path.substring(path.indexOf("\\src\\content\\blog") + 18, path.lastIndexOf(".md")).split('\\')[0]
}


export default function (options?: Record<string, any>): AstroIntegration {

  const PathSet = new Set<string>()
  let clientURL: URL, rootPath: URL, buildOutput: string

  return {
    name: 'BuildSearchIndex',
    hooks: {
      "astro:config:done": async ({ config }) => {
        clientURL = config.build.client
        rootPath = config.root
        buildOutput = config.output
      },

      "astro:build:setup": async ({ vite }) => {
        await fileDisplay(`${vite.root}\\src\\content\\blog`, [".md", ".mdx"], PathSet)
      },
      "astro:build:ssr": () => {
        const mi = new MI()
        const SearchIndex: Record<string, string> = {}
        PathSet.forEach((path) => {
          SearchIndex[subMarkdownTitle(path)] = mi.renderInline(fs.readFileSync(path, 'utf-8'))
        })
        if (buildOutput == "server") {
          const p = fileURLToPath(`${clientURL.href}SearchIndex.json`)
          fs.writeFileSync(p, JSON.stringify(SearchIndex), 'utf-8')
          logSuccess(`成功构建搜索索引：${p}，文件大小：${(fs.readFileSync(p).length / 1024).toFixed(2)}KB`)
        }
      }
    }
  }
}
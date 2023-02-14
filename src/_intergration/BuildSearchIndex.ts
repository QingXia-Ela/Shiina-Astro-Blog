import type { AstroIntegration } from "astro";
import fs from 'fs'
import fsp from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import cfg from '../../blog.config'
import { logSuccess, logInfo } from "../utils/ChalkTips";
import chokidar from 'chokidar'
import MarkdownFrontMatterResolve from "../utils/MarkdownFrontMatterResolve";

/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 * @param extension 限制的扩展名
 * @param res 结果列表
 */
async function fileDisplay(filePath: string, extension: string[] = [], res: Set<string>) {
  const files = await fsp.readdir(filePath)
  await Promise.all(files.map(async function (filename) {
    //获取当前文件的绝对路径
    const filedir = path.join(filePath, filename);
    //根据文件路径获取文件信息，返回一个fs.Stats对象
    const stats = await fsp.stat(filedir)
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
  }))
  return res
}

function subMarkdownTitle(path: string) {
  // 处理 windows 与 GitHub ubuntu 路径斜杠方向不一致的问题
  const P1 = path.split('\\').pop() ?? "", P2 = path.split('/').pop() ?? "", PostsName = P1.length > P2.length ? P2 : P1
  return PostsName.substring(0, PostsName.lastIndexOf(".md"))
}

async function getSearchIndex(root: string) {
  const PathSet = new Set<string>()
  await fileDisplay(`${root}src/content/blog`, [".md", ".mdx"], PathSet)
  const SearchIndex: Record<string, string> = {}
  PathSet.forEach((path) => {
    const res = fs.readFileSync(path, 'utf-8')
      , frontmatter = MarkdownFrontMatterResolve(res)
    SearchIndex[frontmatter['title']] = res
  })
  return SearchIndex
}

async function writeDevCacheSearch(rootPath: string, data: string) {
  try {
    await fsp.mkdir(`${rootPath}/.blog/`)
  } catch (e) { /* empty */ }
  await fsp.writeFile(`${rootPath}/.blog/SearchIndex.json`, data, 'utf-8')
}


export default function (options?: Record<string, any>): AstroIntegration {
  let rootPath: string

  return {
    name: 'BuildSearchIndex',
    hooks: {
      "astro:config:done": async ({ config }) => {
        rootPath = fileURLToPath(config.root)
      },
      "astro:server:start": async () => {
        const { SearchConfig } = cfg
        const writeDevSearchIndex = (p: string, log: boolean) => {
          if (!SearchConfig?.buildSearchIndex) return
          DebounceTimer = setTimeout(async () => {
            const res = await getSearchIndex(rootPath)
            writeDevCacheSearch(rootPath, JSON.stringify(res))
            if (log) logInfo(` ✨ New blog detected: ` + p)
          }, 100);
        }

        writeDevCacheSearch(rootPath, "{}")
        let DebounceTimer: NodeJS.Timeout

        const observer = chokidar.watch(`${rootPath}/src/content/blog/`)

        observer.on("add", (p) => {
          clearTimeout(DebounceTimer)
          writeDevSearchIndex(p, /.md/.test(p))
        }).on("unlink", (p) => { writeDevSearchIndex(p, false) })
          .on("change", (p) => {
            writeDevSearchIndex(p, false)
          })
      },
      'astro:build:done': async ({ dir, pages }) => {
        const { SearchConfig } = cfg
        if (SearchConfig?.active) {
          if (SearchConfig?.buildSearchIndex) {
            const SearchIndex = await getSearchIndex(rootPath)
            const p = `${fileURLToPath(dir)}SearchIndex.json`
            fs.writeFileSync(p, JSON.stringify(SearchIndex), 'utf-8')
            logSuccess(`成功构建搜索索引: ${p}, 文件大小：${(fs.readFileSync(p).length / 1024).toFixed(2)}KB`)
          }
        }
      }
    }
  }
}
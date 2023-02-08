import type { SearchResult, SearchResultItem } from '@/declare/Search'
import cfg from 'blog.config'

export interface SearchParams {
  keywords: string
  limit?: number
  offset?: number
}

interface ServerProps<T> {
  staticData?: T
  staticSearchHandler?: typeof cfg.SearchConfig.staticSearchHandler
}

export default class <T = any> {
  staticData: T
  staticSearchHandler: typeof cfg.SearchConfig.staticSearchHandler
  cacheKeywords: string
  resultCacheData: SearchResultItem[]
  finishRequireData: boolean

  constructor({
    staticData,
    staticSearchHandler
  }: ServerProps<T>) {
    this.staticData = staticData as T
    this.staticSearchHandler = staticSearchHandler
    this.cacheKeywords = ""
    this.resultCacheData = []
    this.finishRequireData = false
  }

  sliceCacheData(offset = 0, limit = 10) {
    return {
      end: offset + limit > this.resultCacheData.length,
      data: this.resultCacheData.slice(offset, offset + limit)
    }
  }

  setStaticData(data: T) {
    this.staticData = data
    this.finishRequireData = true
  }

  async goSearch({ keywords, offset, limit }: SearchParams): Promise<SearchResult> {
    // static
    if (cfg.SearchConfig.mode === "static") {
      const res: SearchResult = {
        code: "200",
        msg: "success!",
        end: true,
        data: []
      }
      if (!keywords) {
        res.code = "400"
        res.msg = "Keywords is empty!"
        return res
      }
      if (this.cacheKeywords !== keywords) {
        if (this.staticSearchHandler) {
          this.resultCacheData = await this.staticSearchHandler(this.staticData, keywords)
        }
        else {
          const s = this.staticData as Record<string, string>,
            reg = new RegExp(keywords.toLowerCase()),
            result: SearchResultItem[] = []

          for (const k in s) {
            if (Object.prototype.hasOwnProperty.call(s, k)) {
              const e = s[k], i = e.toLowerCase().indexOf(reg.source)
              if (reg.test(k.toLowerCase())) {
                result.push({
                  title: k,
                  content: k
                })
              }
              else if (i != -1) {
                const t = i + reg.source.length
                result.push({
                  title: k,
                  content: `${e.substring(t, t + 100)}`,
                  hl: e.substring(i, i + reg.source.length)
                })
              }
            }
          }
          this.resultCacheData = result
        }
      }
      this.cacheKeywords = keywords

      const splitRes = this.sliceCacheData(offset, limit)
      res.data = splitRes.data
      res.end = splitRes.end

      return res
    }

    // server
    let requestURL = `${cfg.SearchConfig.requestURL!}?keywords=${keywords}`
    if (typeof offset === "number") requestURL += `&offset=${offset}`
    if (limit) requestURL += `&limit=${limit}`
    return await (await fetch(requestURL)).json() as SearchResult
  }
}
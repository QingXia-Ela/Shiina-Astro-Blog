// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

// 浏览器，值为其对应的版本号
const browser = {
  ie: "0",
  firefox: 0,
  safari: 0,
  konq: 0,
  opera: 0,
  chrome: 0,
}

export function detectBrowserVersion() {
  const ua = navigator.userAgent, b = Object.assign(browser)

  if (window.opera) {
    b.opera = window.opera.version()
  } else if (/AppleWebKit\/(\S+)/.test(ua)) {
    // 判断是 Chrome 还是 safari
    if (/Chrome\/(\S+)/.test(ua)) {
      b.chrome = RegExp['$1']
    } else if (/Version\/(\S+)/.test(ua)) {
      // 仅使用于 safari 3 及其更高版本
      b.safari = RegExp['$1']
    } else {
      // 个别情况-未获取到 safari 版本号的处理
    }
  } else if (/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)) {
    b.konq = RegExp['$1']
  } else if (/rv:([^)]+)\) Gecko\/\d{8}/.test(ua)) {
    if (/Firefox\/(\S+)/.test(ua)) {
      // 火狐浏览器
      b.firefox = RegExp['$1']
    } else {
      // 其他情况
    }
  } else if (/MSIE ([^;]+)/.test(ua)) {
    b.ie = RegExp['$1']
  }

  return b
}

export default function (avaliableVer?: Partial<Record<keyof typeof browser, string | number>>) {
  if (!avaliableVer) avaliableVer = {}

  const BrowserInfo = detectBrowserVersion()

  for (const i in BrowserInfo) {
    if (typeof avaliableVer[i] === "string" && typeof BrowserInfo[i] === "string") {
      const targetVer = avaliableVer[i].split('.')[0], currentVer = BrowserInfo[i].split('.')[0]
      if (parseInt(targetVer) > parseInt(currentVer)) return false
    }
  }

  return true
}
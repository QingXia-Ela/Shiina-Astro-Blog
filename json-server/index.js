import jsonServer from 'json-server'
import { logSuccess } from '../src/utils/ChalkTips'

/** @type {import('../src/declare/Search').SearchResultItem} */
const data = [
  {
    title: '高亮测试',
    hl: '高亮内容',
    content: '会被放在搜索匹配内容框头部',
  },
  {
    title: '不小心追尾了别人的车该怎么办',
    content: '给我学狗叫，三回啊三回'
  },
  {
    title: 'NCY-108 测评',
    content: '你在干什么？这里不是西安环卫网'
  },
  {
    title: '114514',
    hl: 1919,
    content: 810
  },
  {
    title: '哼哼哼',
    content: '啊啊啊啊啊啊啊啊啊啊啊啊'
  },
  {
    title: '高亮测试',
    hl: '高亮内容',
    content: '会被放在搜索匹配内容框头部',
  },
  {
    title: '给我玩PDC.jpg',
    content: 'pdc的网站还有114514天上线'
  }
]

export default function RunSerever() {
  const server = jsonServer.create()
  // const router = jsonServer.router('./db.json')
  const middlewares = jsonServer.defaults()

  server.use(middlewares)
  // server.use(router)
  let flag = false


  // search
  server.get('/search', (req, res) => {
    // console.log(req, res);
    const { offset = 0, limit, keywords } = req.query

    if (!keywords) res.jsonp({
      code: 400,
      msg: "参数不合法"
    })
    else {
      flag ? res.jsonp({
        code: 200,
        msg: "success",
        end: offset + limit > data.length,
        data: data.slice(offset, offset + limit)
      }) : res.status(502).jsonp({
        code: 502,
        msg: "模拟错误！"
      })
      flag = true
    }
  })

  server.listen(5573, () => {
    logSuccess(`JSON Server is running at http://127.0.0.1:${5573}`, " JSON-Server ")
  })
}

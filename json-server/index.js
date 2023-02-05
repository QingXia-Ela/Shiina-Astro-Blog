import jsonServer from 'json-server'
import { logSuccess } from '../src/utils/ChalkTips'

/** @type {import('../src/declare/Search').SearchResultItem} */
const data1 = [
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
  }
]

/** @type {import('../src/declare/Search').SearchResultItem} */
const data2 = [
  {
    title: '高亮测试',
    hl: '高亮内容',
    content: '会被放在搜索匹配内容框头部',
  },
  {
    title: '给我玩PDC.jpg',
    content: 'pdc的网站还有1145145天上线'
  }
]

export default function RunSerever() {
  const server = jsonServer.create()
  // const router = jsonServer.router('./db.json')
  const middlewares = jsonServer.defaults()

  server.use(middlewares)
  // server.use(router)


  // search
  server.get('/search', (req, res) => {
    // console.log(req, res);
    console.log(req.query);
    const { offset, key } = req.query
    switch (parseInt(offset)) {
      case 1:
        res.jsonp({
          code: 200,
          msg: 'success',
          end: false,
          data: data1
        })
        break;

      case 2:
        res.jsonp({
          code: 200,
          msg: 'success',
          end: true,
          data: data2
        })
        break;

      case Number.isNaN(parseInt(offset)):
        res.jsonp({
          code: 400,
          msg: 'Query offset invalid!',
        })
        break;

      default:
        res.jsonp({
          code: 200,
          msg: 'success',
          end: true,
          data: []
        })

        break;
    }
  })

  server.listen(5573, () => {
    logSuccess(`JSON Server is running at http://127.0.0.1:${5573}`, " JSON-Server ")
  })
}

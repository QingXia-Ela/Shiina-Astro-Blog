import chalk from "chalk"

const commands = `执行方法： npx blog [command] <params>

命令：
  server        启动开发服务器，例："npx blog server --port=4000" 可以设置端口
  new <文章名>  创建一个新文章
  build         构建博客，本质上是执行了 ${chalk.blue("npm run build")}
  deploy        部署博客，会根据设置内的 git 仓库进行文件的 push 操作

推荐使用内置的启动脚本：
  ${chalk.blue("npm run dev")} 直接启动开发服务器
  ${chalk.blue("npm run build")} 执行博客构建
`

export default function GetCommands() {
  console.log(commands)
}
#! /usr/bin/env node
/* eslint-disable no-undef */
import CreateNewBlog from "./command/new.js";
import GetCommands from "./command/command.js";
import cp from 'child_process'
import chalk from "chalk";
import deploy from "./command/deploy.js";
const [_1, _2, command, ...args] = process.argv

switch (command) {
  case 'n':
  case 'new':
    CreateNewBlog(args.join("-"))
    break;

  case 'b':
  case 'build':
    cp.exec("astro build").stdout.on("data", (data) => {
      console.log(`${data}`);
    })
    break;

  case 's':
  case 'server':
    cp.exec(`astro dev --host ${args.join(" ")}`).stdout.on("data", (data) => {
      console.log(`${data}`);
    })
    break;

  case 'd':
  case 'deploy':
    await deploy()
    console.log(chalk.bold.bgGreen(" SUCCESS ") + chalk.bold(" 推送成功！请前往仓库查看构建状态"))
    break;

  default:
    console.log(chalk.bold.bgRed(" ERROR ") + chalk.bold(" 未知指令！可以查看以下指令列表进行指令执行："))
    GetCommands()
    break;
}

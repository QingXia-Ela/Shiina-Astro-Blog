#! /usr/bin/env node
/* eslint-disable no-undef */
import CreateNewBlog from "./command/new.js";
import GetCommands from "./command/command.js";
import cp from 'child_process'
import chalk from "chalk";
const [_1, _2, command, ...args] = process.argv

switch (command) {
  case 'new':
    CreateNewBlog(args.join("-"))
    break;
  case 'build':
    cp.exec("astro build").stdout.on("data", (data) => {
      console.log(`${data}`);
    })
    break;
  case 'server':
    cp.exec(`astro dev --host ${args.join(" ")}`).stdout.on("data", (data) => {
      console.log(`${data}`);
    })
    break;

  default:
    console.log(chalk.bold.bgRed(" ERROR ") + chalk.bold(" 未知指令！可以查看以下指令列表进行指令执行："))
    GetCommands()
    // cp.execSync()
    break;
}

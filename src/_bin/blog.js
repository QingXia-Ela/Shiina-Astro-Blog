/* eslint-disable no-undef */
import CreateNewBlog from "./command/new.js";
/** @type {NodeJS.Process} process */
// console.log(process.argv);
const [_1, _2, command, ...args] = process.argv



switch (command) {
  case 'new':
    CreateNewBlog(args.join("-"))
    break;

  default:
    break;
}
import { exec } from 'child_process'

const c = ["git add .",
  `git commit -m "Update posts"`,
  "git push"
]

async function push(command) {
  return new Promise((res, rej) => {
    exec(command).stdout.on("data", (ch) => {
      console.log(ch);
    }).on("error", (e) => rej(e)).on("end", () => res())
  })
}

export default async function () {
  await push(c[0])
  await push(c[1])
  await push(c[2])
}
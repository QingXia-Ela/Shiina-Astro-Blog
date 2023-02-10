import { exec } from 'child_process'

const c = ["git add .",
  `git commit -m "Update posts"`,
  "git push"
]


export default function () {
  exec(c[0]).stdout.on("data", (ch) => {
    console.log(ch);
  }).on("end", () => {
    exec(c[1]).stdout.on("data", (ch) => {
      console.log(ch);
    }).on("end", () => {
      exec(c[2]).stdout.on("data", (ch) => {
        console.log(ch);
      }).on("end", () => {
        console.log("推送成功");
      })
    })
  })
}
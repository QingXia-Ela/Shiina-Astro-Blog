type T = string | Date

function MakeUpZero(n: number) {
  return n > 9 ? n + "" : "0" + n
}

export default function (t: T) {
  const D = new Date(t);

  return `${D.getFullYear()}-${MakeUpZero(D.getMonth() + 1)}-${MakeUpZero(D.getDate() - 1)}`
}

export function PostsPublicTime(t: T) {
  const D = new Date(t);

  return `${D.getFullYear()} 年 ${D.getMonth() + 1} 月 ${D.getDate() - 1} 日 - ${MakeUpZero(D.getHours())}:${MakeUpZero(D.getMinutes())}:${MakeUpZero(D.getSeconds())} 发布`
}
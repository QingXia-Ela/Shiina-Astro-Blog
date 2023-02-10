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
  if (D.toString() === "Invalid Date") return t
  return `${D.getFullYear()} 年 ${D.getMonth() + 1} 月 ${D.getDate()} 日 - ${MakeUpZero(D.getUTCHours())}:${MakeUpZero(D.getUTCMinutes())}:${MakeUpZero(D.getUTCSeconds())}`
}
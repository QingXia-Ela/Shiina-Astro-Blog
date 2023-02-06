
function MakeUpZero(n) {
  return n > 9 ? n + "" : "0" + n
}

export default function PostsPublicTime(t) {
  const D = new Date(t);
  return `${D.getFullYear()}-${D.getMonth() + 1}-${D.getDate() - 1} ${MakeUpZero(D.getHours())}:${MakeUpZero(D.getMinutes())}:${MakeUpZero(D.getSeconds())}`
}

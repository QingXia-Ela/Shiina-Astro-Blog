function MakeUpZero(n: number) {
  return n > 9 ? n + "" : "0" + n
}

export default function (t: string | Date) {
  const D = new Date(t);

  return `${D.getFullYear()}-${MakeUpZero(D.getMonth() + 1)}-${MakeUpZero(D.getDate() - 1)}`
}
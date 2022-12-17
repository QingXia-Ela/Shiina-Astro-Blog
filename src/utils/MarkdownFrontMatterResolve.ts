const Split = '---'

function removeCharOnHeadAndTail(str: string, ch?: string | RegExp, time = 1) {
  const s = str.split("")
  for (let i = 0; i < time; i++) {
    if (typeof ch === 'string') {
      if (s[0] === ch) s.shift()
      if (s[s.length - 1] === ch) s.pop()
    }
    else if (typeof ch !== 'undefined') {
      if (ch.test(s[0])) s.shift()
      if (ch.test(s[s.length - 1])) s.pop()
    }
  }
  return s.join("")
}

function SpeicalKeyFactory(key: string, value: string) {
  let newVal: string | string[] = value
  switch (key) {
    case 'time':
      return new Date(value)
    case 'tags': {
      const s = removeCharOnHeadAndTail(value, ' ').split("")
      s.pop(), s.shift()
      newVal = s.join('').split(',')
      break;
    }
    case 'categories':
      newVal = removeCharOnHeadAndTail(value, /[ '"]/, 2)
      break;
    default:
      newVal = removeCharOnHeadAndTail(value, ' ')
      break;
  }
  return newVal
}

export default function (str: string) {
  const I1 = str.indexOf(Split), res: { [key: string]: any } = {}
  let I2 = 0
  if (I1 === 0) {
    I2 = str.indexOf(Split, 2)
    const InfoArray = str.substring(4, I2 - 1).split("\n")
    for (const i of InfoArray) {
      const index = i.indexOf(":"), key = i.substring(0, index), value = i.substring(index + 1)
      res[key] = SpeicalKeyFactory(key, value)
      res['_content'] = str.substring(I2 + 3)
    }
  }
  return res
}

import chalk from 'chalk'

export function logError(msg: unknown, header = " ERROR ") {
  console.log(`${chalk.bold.bgGreen(header)} ${chalk.bold(msg)}`)
}

export function logWarn(msg: unknown, header = " WARN ") {
  console.log(`${chalk.bold.bgGreen(header)} ${chalk.bold(msg)}`)
}

export function logSuccess(msg: unknown, header = " SUCCESS ") {
  console.log(`${chalk.bold.bgGreen(header)} ${chalk.bold(msg)}`)
}


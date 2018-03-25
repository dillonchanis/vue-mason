const path = require('path')
const fs = require('fs')
const ejs = require('ejs')
const mkdirp = require('mkdirp')
const chalk = require('chalk')
const { compose } = require('../utils')

const cwd = process.cwd()

const createFile = (filePath, content, data) => fs.writeFileSync(
  filePath,
  ejs.render(content, data),
  'utf-8'
)

const createDirectory = dir => compose(mkdirp.sync, removeTrailingSlash)(dir)

const log = (msg, type) => {
  switch (type) {
    case 'success':
      console.log(chalk.green(msg))
      break
    case 'warning':
      console.log(chalk.yellow(msg))
      break
    case 'error':
      console.log(chalk.red(msg))
      break
    default:
      console.log(msg)
  }
}

const pathDoesNotExist = p => !fs.existsSync(p)

const removeTrailingSlash = str => str.replace(/\/+$/, '')

const templateContents = x => fs.readFileSync(x, 'utf8')

const templatePath = (...args) => path.join(__dirname, '../', ...args)

const writePath = p => path.join(cwd, p)

module.exports = {
  createFile,
  createDirectory,
  log,
  pathDoesNotExist,
  removeTrailingSlash,
  templateContents,
  templatePath,
  writePath
}

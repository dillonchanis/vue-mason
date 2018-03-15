const path = require('path')
const fs = require('fs')
const ejs = require('ejs')
const mkdirp = require('mkdirp')
const { compose } = require('./utils')

const cwd = process.cwd()

const removeTrailingSlash = str => str.replace(/\/+$/, '')

const createDir = dir => {
  compose(mkdirp.sync, removeTrailingSlash)(dir)
}

const componentFileType = type => (type ? type : 'single-file')

const componentWritePath = p => (p ? path.join(cwd, p) : cwd)

function create(name, options) {
  const type = componentFileType(options.type)
  const writePath = componentWritePath(options.path)

  if (!fs.existsSync(writePath)) {
    createDir(writePath)
  }

  const templatePath = path.join(
    __dirname,
    '/templates/component',
    `${type}-component.ejs`
  )
  const templateContents = fs.readFileSync(templatePath, 'utf8')

  fs.writeFileSync(
    `${writePath}/${name}.vue`,
    ejs.render(templateContents, { name }),
    'utf-8'
  )
}

module.exports = create

const path = require('path')
const fs = require('fs')
const ejs = require('ejs')
const mkdirp = require('mkdirp')
const { compose, zipWith } = require('./utils')
const chalk = require('chalk')

const cwd = process.cwd()

const removeTrailingSlash = str => str.replace(/\/+$/, '')

const createDir = dir => compose(mkdirp.sync, removeTrailingSlash)(dir)

const componentFileType = type => (type ? type : 'single-file')

const componentWritePath = p => (p ? path.join(cwd, p) : cwd)

function component(name, options) {
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

function route(urls, { component, name, p, filename }) {
  const writePath = componentWritePath(p)
  const filepath = filename.endsWith('.js')
    ? `${writePath}/${filename}`
    : `${writePath}/${filename}.js`

  if (!fs.existsSync(writePath)) {
    createDir(writePath)
  }

  if (fs.existsSync(filepath)) {
    console.log(chalk.yellow('That file already exists.'))
    return
  }

  const templatePath = path.join(__dirname, '/templates/route/route.ejs')
  const templateContents = fs.readFileSync(templatePath, 'utf8')

  const routes = zipWith(urls, component, name, (url, comp = '', routeName = '') => ({
    url,
    component: comp,
    name: routeName
  }))

  fs.writeFileSync(
    `${writePath}/route.js`,
    ejs.render(templateContents, { routes }),
    'utf8'
  )
}

function store() {}

module.exports = {
  component,
  route,
  store
}

const Command = require('./Command')
const { zipWith } = require('./utils')

function component (name, options) {
  const { type } = options
  const writePath = Command.writePath(options.path)

  if (Command.pathDoesNotExist(writePath)) {
    Command.createDirectory(writePath)
  }

  const templatePath = Command.templatePath(
    '/templates/component',
    `${type}-component.ejs`
  )
  const templateContents = Command.templateContents(templatePath)

  Command.createFile(`${writePath}/${name}.vue`, templateContents, { name })
}

function route (urls, { component, name, path, filename }) {
  const writePath = Command.writePath(path)
  const filepath = filename.endsWith('.js')
    ? `${writePath}/${filename}`
    : `${writePath}/${filename}.js`

  if (Command.pathDoesNotExist(writePath)) {
    Command.createDirectory(writePath)
  }

  if (!Command.pathDoesNotExist(filepath)) {
    Command.log('That path already exists!', 'warning')
    return
  }

  const templatePath = Command.templatePath('/templates/route/route.ejs')
  const templateContents = Command.templateContents(templatePath)

  const routes = zipWith(
    urls,
    component,
    name,
    (url, comp = '', routeName = '') => ({
      url,
      component: comp,
      name: routeName
    })
  )

  Command.createFile(`${writePath}/route.js`, templateContents, { routes })
}

const STORE_SPREAD_NAMES = [
  'actions',
  'index',
  'mutation-types',
  'mutations',
  'state'
]

function store (name, { type, path, namespaced }) {
  const dirName = `${Command.removeTrailingSlash(path)}/${name}`
  const writePath = Command.writePath(dirName)

  if (Command.pathDoesNotExist(writePath)) {
    Command.createDirectory(writePath)
  } else {
    Command.log('That path already exists!', 'warning')
    return
  }

  const templateType = type === 'flat' ? 'flat.ejs' : 'spread/'
  const templatePath = Command.templatePath('/templates/store', templateType)

  if (templateType === 'flat') {
    const templateContents = Command.templateContents(templatePath)
    Command.createFile(`${writePath}/index.js`, templateContents, { namespaced })
  } else {
    STORE_SPREAD_NAMES.forEach(name => {
      const templateContents = Command.templateContents(`${templatePath}${name}.ejs`)
      Command.createFile(`${writePath}/${name}.js`, templateContents, { namespaced })
    })
  }
}

module.exports = {
  component,
  route,
  store
}

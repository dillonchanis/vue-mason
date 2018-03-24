const Command = require('./Command')
const { zipWith } = require('./utils')

function component(name, options) {
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

function route(urls, { component, name, p, filename }) {
  const writePath = componentWritePath(p)
  const filepath = filename.endsWith('.js')
    ? `${writePath}/${filename}`
    : `${writePath}/${filename}.js`

  if (Command.pathDoesNotExist(writePath)) {
    Command.createDirectory(writePath)
  }

  if (!Command.pathDoesNotExist(filepath)) {
    Command.log('That file already exists!', 'warning')
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

module.exports = {
  component,
  route
}

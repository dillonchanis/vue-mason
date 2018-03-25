const Command = require('../Command/')
const { zipWith } = require('../utils')

class RouteCommand extends Command {
  constructor (routes, options) {
    super()

    this.routes = routes
    this.options = options
    this.writePath = this.createWritePath(options.path)
  }

  get filename () {
    const { filename } = this.options
    return filename.endsWith('.js')
      ? filename
      : `${filename}.js`
  }

  get templatePath () {
    return this._templatePath('/src/templates/route/route.ejs')
  }

  async createFile () {
    const { component, name } = this.options
    const templateContents = await this.readFile(this.templatePath)
    const file = `${this.writePath}/${this.filename}`

    const routes = zipWith(this.routes, component, name, (url, component, name) => ({
      url,
      component,
      name
    }))

    await this.writeFile(
      file,
      templateContents,
      { routes }
    )
  }
}

module.exports = RouteCommand

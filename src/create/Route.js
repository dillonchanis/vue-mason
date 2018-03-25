const Command = require('../Command/')
const { zipWith } = require('../utils')

/**
 * Creates a new Vue route object
 *
 * @class RouteCommand
 * @constructor
 */
class RouteCommand extends Command {
  constructor (routes, options) {
    super()

    this.routes = routes
    this.options = options
    this.writePath = this.createWritePath(options.path)
  }

  /**
   * Get filename
   *
   * @return {String}
   */
  get filename () {
    const { filename } = this.options
    return filename.endsWith('.js')
      ? filename
      : `${filename}.js`
  }

  /**
   * Path to the template file
   *
   * @method templatePath
   * @return {String}
   */
  get templatePath () {
    return this._templatePath('/src/templates/route/route.ejs')
  }

  /**
   * Creates the Component file
   *
   * @return {void}
   */
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

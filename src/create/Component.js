const chalk = require('chalk')
const Command = require('../Command/')
const { capitalize, compose, padLeft, bullet } = require('../utils')

/**
 * Create a new Vue Component file
 *
 * @class ComponentCommand
 * @constructor
 */
class ComponentCommand extends Command {
  constructor (name, { type, path }) {
    super()

    this.name = name
    this.type = type
    this.writePath = this.createWritePath(path)
  }

  /**
   * Path to the template file
   *
   * @method templatePath
   * @return {String}
   */
  get templatePath () {
    return this._templatePath('/src/templates/component', `${this.type}-component.ejs`)
  }

  /**
   * The types of Component files that can be generated
   *
   * @method types
   * @return {Array}
   */
  static get types () {
    return ['single-file (default)', 'class', 'jsx', 'render']
  }

  /**
   * Print the types of Component files
   *
   * @private
   */
  static _printTypes () {
    this.types.forEach(type => {
      compose(
        console.log,
        chalk.yellow,
        padLeft(2, ' '),
        bullet
      )(type)
    })
    console.log()
  }

  /**
   * Log the types of Component files a user can generate
   *
   * @return {void}
   */
  static get help () {
    ComponentCommand._printTypes()
  }

  /**
   * Creates the Component file
   *
   * @return {void}
   */
  async createFile () {
    const templateContents = await this.readFile(this.templatePath)
    const file = `${this.writePath}/${this.name}.vue`

    await this.writeFile(
      file,
      templateContents,
      { name: this.name }
    )

    this.logSuccess(`${capitalize(this.type)} component`)
  }
}

module.exports = ComponentCommand

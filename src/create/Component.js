const Command = require('../Command/')
const { compose, padLeft, bullet } = require('../utils')

class ComponentCommand extends Command {
  constructor (name, { type, path }) {
    super()

    this.name = name
    this.type = type
    this.writePath = this.createWritePath(path)
  }

  get templatePath () {
    return this._templatePath('/src/templates/component', `${this.type}-component.ejs`)
  }

  static get types () {
    return [
      'single-file (default)',
      'class',
      'jsx',
      'render'
    ]
  }

  static _printTypes () {
    console.log()
    this.types.forEach(type => {
      compose(
        console.log,
        chalk.yellow,
        padLeft(2, ' '),
        bullet
      )(type)
    })
  }

  static get help () {
    compose(
      console.log,
      chalk.bold.cyan,
      padLeft(2, ' ')
    )('Available component templates:')
    this._printTypes()
  }

  async createFile () {
    const templateContents = await this.readFile(this.templatePath)
    const file = `${this.writePath}/${this.name}.vue`

    await this.writeFile(
      file,
      templateContents,
      { name: this.name }
    )
  }
}

module.exports = ComponentCommand

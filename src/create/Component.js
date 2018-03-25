const Command = require('../Command/')

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

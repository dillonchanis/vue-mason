const Command = require('../Command')

class StoreCommand extends Command {
  constructor (name, { type, path, namespaced }) {
    super()

    this.name = name
    this.type = type
    this.namespaced = namespaced
    this.writePath = this.createWritePath(path)
  }

  get templateType () {
    return this.type === 'flat' ? 'flat.ejs' : 'spread/'
  }

  get templatePath () {
    return this._templatePath('/src/templates/store', this.templateType)
  }

  static get storeTypes () {
    return [
      'actions',
      'index',
      'mutation-types',
      'mutations',
      'state'
    ]
  }

  async _createFlat () {
    const templateContents = await this.readFile(this.templatePath)
    const file = `${this.writePath}/index.js`

    await this.writeFile(
      file,
      templateContents,
      { namespaced: this.namespaced}
    )
  }

  async _createSpread () {
    StoreCommand.storeTypes.forEach(async (type) => {
      const templateContents = await this.readFile(`${this.templatePath}${type}.ejs`)
      const file = `${this.writePath}/${name}.js`

      await this.writeFile(
        file,
        templateContents,
        { namespaced: this.namespaced }
      )
    })
  }

  createFile () {
    if (this.type === 'flat') {
      this._createFlat()
    } else {
      this._createSpread()
    }
  }
}

module.exports = StoreCommand

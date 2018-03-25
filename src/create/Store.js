const Command = require('../Command')

/**
 * Create a new Vuex store file
 *
 * @class StoreCommand
 * @constructor
 */
class StoreCommand extends Command {
  constructor (name, { type, path, namespaced }) {
    super()

    this.name = name
    this.type = type
    this.namespaced = namespaced
    this.writePath = this.createWritePath(path)
  }

  /**
   * Get the Vuex template type
   *
   * @return {String}
   */
  get templateType () {
    return this.type === 'flat' ? 'flat.ejs' : 'spread/'
  }

  /**
   * Path to the template file
   *
   * @method templatePath
   * @return {String}
   */
  get templatePath () {
    return this._templatePath('/src/templates/store', this.templateType)
  }

  /**
   * Get the spread file names
   *
   * @static
   * @return {Array}
   */
  static get storeTypes () {
    return [
      'actions',
      'index',
      'mutation-types',
      'mutations',
      'state'
    ]
  }

  /**
   * Create flat Vuex store file
   *
   * @private
   * @return {void}
   */
  async _createFlat () {
    const templateContents = await this.readFile(this.templatePath)
    const file = `${this.writePath}/index.js`

    await this.writeFile(
      file,
      templateContents,
      { namespaced: this.namespaced}
    )
  }

  /**
   * Create individual Vuex store files
   *
   * @private
   * @return {void}
   */
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

  /**
   * Creates the Vuex file(s)
   *
   * @return {void}
   */
  createFile () {
    if (this.type === 'flat') {
      this._createFlat()
    } else {
      this._createSpread()
    }
  }
}

module.exports = StoreCommand

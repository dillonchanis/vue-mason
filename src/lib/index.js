const chalk = require('chalk')
const { compose, padLeft, bullet } = require('../utils')

class ComponentCommand {
  static get types () {
    return [
      'single-file (default)',
      'class',
      'jsx',
      'render'
    ]
  }

  static _printTypes () {
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
    console.log()
    compose(
      console.log,
      chalk.bold.cyan,
      padLeft(2, ' ')
    )('Available component templates:')
    console.log()
    this._printTypes()
    console.log()
  }
}

module.exports = ComponentCommand

const chalk = require('chalk')
const Command = require('../Base')
const { compose, padLeft, bullet } = require('../../utils/')

/**
 * Create a Vue component file
 *
 * @class ComponentCommand
 * @constructor
 */
class ComponentCommand extends Command {
  constructor (name, options) {
    super()

    this.name = name
    this.options = options
  }

  static get types () {
    return [
      'single-file (default)',
      'class-component',
      'jsx',
      'render'
    ]
  }

  static get _printTypes () {
    return this.types.forEach(type => {
      compose(
        console.log,
        chalk.yellow,
        padLeft(2, " "),
        bullet
      )(type)
    })
  }

  static get help () {
    console.log()
    compose(
      console.log,
      chalk.bold.cyan,
      padLeft(2, " ")
    )('Available component templates:')
    console.log()
    this._printTypes
    console.log()
  }
}

module.exports = ComponentCommand

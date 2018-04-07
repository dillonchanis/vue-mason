const fs = require('fs')
const mkdirp = require('mkdirp')
const path = require('path')
const ejs = require('ejs')
const util = require('util')
const chalk = require('chalk')

const { compose, padLeft, removeTrailingSlash } = require('../utils')
const cwd = process.cwd()

/**
 * Class for parsing Commander options
 */
class Command {
  static get help () {
    console.log()
    compose(console.log, chalk.bold.cyan, padLeft(2, ' '))('Available --type options:')
    console.log()
  }

  /**
   * Executes file creation
   *
   * @return {void}
   */
  async boot () {
    try {
      await this.setupDirectory()
      await this.createFile()
    } catch (err) {
      console.error(err)
    }
  }

  /**
   * Creates required directories if needed
   *
   * @return {void}
   */
  async setupDirectory () {
    if (!this.writePath) {
      console.warn('No write path as been specified.')
      return
    }

    this._createDirectory()
  }

  /**
   * Creates directory based on write path
   *
   * @private
   * @return {void}
   */
  _createDirectory () {
    return compose(
      mkdirp.sync,
      removeTrailingSlash
    )(this.writePath)
  }

  /**
   * Creates a write path for file creation
   *
   * @param {String} p - Path
   * @return {String}
   */
  createWritePath (p) {
    return path.join(cwd, p)
  }

  /**
   * Checks if directory path exists
   *
   * @param {String} path - Path of file to write
   * @return {Boolean}
   */
  pathExists (path) {
    return fs.existsSync(path)
  }

  /**
   * Creates path to correct template files
   *
   * @param {String} args - File paths
   * @return {String}
   */
  _templatePath (...args) {
    return path.join(global.APP_ROOT, ...args)
  }

  /**
   * Logs the error to the console
   *
   * @param {String} err - Error message
   * @return {void}
   */
  logError (err) {
    console.error(err)
  }

  logSuccess (fileType) {
    console.log(chalk.green(`✔ ${fileType} was successfully created!`))
  }

  /**
   * Reads a given file
   *
   * @param {String} file - File to read
   * @return {Promise}
   */
  readFile (file) {
    const readFilePromise = util.promisify(fs.readFile)
    return readFilePromise(file, 'utf8')
  }

  /**
   * Writes a file. Rendered via ejs
   *
   * @param {*} filePath - Path to save file
   * @param {*} content - File contents to save
   * @param {*} data - Variables to pass to file contents
   * @return {Promise}
   */
  writeFile (filePath, content, data) {
    const writeFilePromise = util.promisify(fs.writeFile)
    return writeFilePromise(filePath, ejs.render(content, data), 'utf-8')
  }
}

module.exports = Command

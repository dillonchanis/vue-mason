const fs = require('fs')
const mkdirp = require('mkdirp')
const path = require('path')
const ejs = require('ejs')
const cwd = process.cwd()
const util = require('util')
const { compose, removeTrailingSlash } = require('../utils')

/**
 * Class for parsing Commander options
 */
class Command {
  async boot () {
    try {
      await this.setupDirectory()
      await this.createFile()
    } catch (err) {
      console.error(err)
    }
  }

  async setupDirectory () {
    if (!this.writePath) {
      console.warn('No write path as been specified.')
      return
    }

    let exists

    try {
      exists = await this.pathExists()
    } catch (err) {
      console.error(err)
    }

    if (exists) {
      console.warn('That path already exists!')
      return
    }

    this._createDirectory()
  }

  _createDirectory () {
    return compose(
      mkdirp.sync,
      removeTrailingSlash
    )(this.writePath)
  }

  createWritePath (p) {
    return path.join(cwd, p)
  }

  pathExists () {
    let exists

    fs.access(this.writePath, err => {
      if (err && err.code === 'ENOENT') {
        exists = false
      } else {
        exists = true
      }
    })

    return exists
  }

  _templatePath (...args) {
    return path.join(global.APP_ROOT, ...args)
  }

  logError (err) {
    console.log('err', err)
  }

  readFile (file) {
    const readFilePromise = util.promisify(fs.readFile)
    return readFilePromise(file, 'utf8')
  }

  writeFile (filePath, content, data) {
    const writeFilePromise = util.promisify(fs.writeFile)
    return writeFilePromise(filePath, ejs.render(content, data), 'utf-8')
  }
}

module.exports = Command

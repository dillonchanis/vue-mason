const fs = require('fs')
const path = require('path')
const ejs = require('ejs')

class Blueprint {
  constructor (type, writePath, vars) {
    this.type = type
    this.writePath = writePath
    this.vars = vars
  }

  createFile () {
    const { templatePath, writePath, vars } = this
    const contents = fs.readFileSync(templatePath, 'utf8')
    fs.writeFileSync(writePath, ejs.render(templatePath, vars), 'utf-8')
  }
}

module.exports = Blueprint

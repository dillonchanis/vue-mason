const ComponentCommand = require('./Component')
const RouteCommand = require('./Route')
const StoreCommand = require('./Store')

module.exports = {
  component: (name, options) => {
    const command = new ComponentCommand(name, options)
    command.boot()
  },
  route: (routes, options) => {
    const command = new RouteCommand(routes, options)
    command.boot()
  },
  store: (name, options) => {
    const command = new StoreCommand(name, options)
    command.boot()
  }
}

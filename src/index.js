const ComponentCommand = require('./create/Component')
const RouteCommand = require('./create/Route')
const StoreCommand = require('./create/Store')

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

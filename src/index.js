const ComponentCommand = require('./Command/Component')

function create (name, options) {
  let { type } = options

  if (!type) type = 'single-file'

  const opts = {
    type,
    path: options.path ? options.path : null
  }

  const cmd = new ComponentCommand(name, opts)
}

module.exports = create

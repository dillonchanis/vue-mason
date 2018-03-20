const zipWith = require('lodash.zipwith')

module.exports = {
  compose: (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x),

  padLeft: (amt, char) => str => str.padStart((str.length + amt), char),

  bullet: str => `• ${str}`,

  zipWith
}

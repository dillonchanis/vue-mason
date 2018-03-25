const bullet = str => `• ${str}`

const compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x)

const padLeft = (amt, char) => str => str.padStart((str.length + amt), char)

const removeTrailingSlash = str => str.replace(/\/+$/, '')

module.exports = {
  bullet,
  compose,
  padLeft,
  removeTrailingSlash,
  zipWith: require('lodash.zipwith')
}

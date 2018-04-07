const bullet = str => `• ${str}`

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)

const compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x)

const padLeft = (amt, char) => str => str.padStart((str.length + amt), char)

const removeTrailingSlash = str => str.replace(/\/+$/, '')

module.exports = {
  bullet,
  capitalize,
  compose,
  padLeft,
  removeTrailingSlash,
  zipWith: require('lodash.zipwith')
}

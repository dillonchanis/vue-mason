const utils = module.exports = {}

utils.compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x)

utils.componentType = str => str.replace('Component', '')

utils.padLeft = (amt, char) => str => str.padStart((str.length + amt), char)

utils.bullet = str => `• ${str}`

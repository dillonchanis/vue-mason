#!/usr/bin/env node

const program = require('commander')
const chalk = require('chalk')
const path = require('path')
const create = require('./src')

const ComponentCommand = require('./src/create/Component')

global.APP_ROOT = Object.freeze(path.resolve(__dirname))

function collect (val, arr) {
  arr.push(val)
  return arr
}

program
  .version(require('./package').version, '-v, --version')
  .usage('<command> [options]')

program
  .command('create:component <component-name>')
  .description('Create a single file Vue component.')
  .option('-t, --type <type>', 'The type of Vue component you want to generate.', 'single-file')
  .option('-p, --path [path]', 'The path where to put the component file. Defaults to a "src" directory.', './src/components')
  .on('--help', () => {
    ComponentCommand.help
  })
  .action((name, options) => {
    create.component(name, options)
  })

program
  .command('create:route <url> [urls...]')
  .description('Create a Vue router file.')
  .option('-c, --component [component]', 'The name of the component the route is for.', collect, [])
  .option('-n, --name [name]', 'The name of the route.', collect, [])
  .option('-p, --path [path]', 'The path where to put the route file. Defaults to a "src/" directory.', './src/')
  .option('-f, --filename [filename]', 'The name of the file to save to. Defaults to routes.js', 'route.js')
  .on('--help', () => {
    console.log('Route help here.')
  })
  .action((url, urls, options) => {
    const routes = urls.length ? [url, ...urls] : [url]
    create.route(routes, options)
  })

program
  .command('create:store <name>')
  .description('Create a Vuex store directory and index file for a component.')
  .option('-t, --type [type]', 'The type of folder structure you want for your Vuex store.', 'flat')
  .option('-n, --namespaced', 'Whether or not the Vuex store is namespaced. Defaults to false.', false)
  .option('-p, --path [path]', 'The path where to save the store folder. Defaults to a "src" directory.', './src/')
  .on('--help', () => {
    // TODO
    console.log('--flat, Create a single index.js containing core Vuex features. (Default)')
    console.log('--spread, Spreads Vuex features into their own files and imported into an index file.')
  })
  .action((name, options) => {
    if (!options.namespaced) options.namespaced = false
    create.store(name, options)
  })

program
  .on('--help', () => {
    console.log()
    console.log(`Run ${chalk.cyan(`vmason <command> --help`)} for more detailed usage.`)
    console.log()
  })

program.parse(process.argv)

#!/usr/bin/env node

const program = require('commander')
const chalk = require('chalk')
const ComponentCommand = require('./src/lib/')
const create = require('./src')

program
  .version(require('./package').version, '-v, --version')
  .usage('<command> [options]')

program
  .command('create:component <component-name>')
  .description('Create a single file Vue component.')
  .option('-t, --type <type>', 'The type of Vue component you want to generate.')
  .option('-p, --path [path]', 'The path where to put the component file.')
  .on('--help', () => {
    ComponentCommand.help
  })
  .action((name, options) => {
    create.component(name, options)
  })

program
  .command('create:route <url>')
  .description('Create a Vue router file.')
  .option('-c, --component [component]', 'The name of the component the route is for.')
  .option('-n, --name [name]', 'The name of the route.')
  .option('-p, --path [path]', 'The path where to put the route file.')
  .on('--help', () => {
    console.log('Route help here.')
  })
  .action((url, options) => {
    create.route(url, options)
  })

program
  .command('create:store <store-name>')
  .description('Create a Vuex store directory and index file for a component.')
  .option('-f, --flat', 'Create a single index.js containing core Vuex features.')
  .option('-s, --spread', 'Spreads Vuex features into their own files and imported into an index file.')
  .action()

program
  .on('--help', () => {
    console.log()
    console.log(`Run ${chalk.cyan(`vmason <command> --help`)} for more detailed usage.`)
    console.log()
  })

program.parse(process.argv)

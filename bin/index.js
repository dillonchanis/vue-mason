#!/usr/bin/env node

const program = require('commander')

program
  .version(require('../package').version, '-v, --version')
  .usage('<command> [options]')

/** Component Commands */
program
  .command('create:component <component-name> [options]')
  .description('Create a Vue component file.')
  .option('-c, --component', 'Create a single file vue component.')
  .option('-cc, --class-component', 'Create a Vue Class Component file.')
  .option('-jsx, --component-jsx', 'Create a JSX component file.')
  .option('-r, --component-render', 'Create a single file vue component with render function.')
  .action()

/** Route Commands */
program
  .command('create:route <route-name> [options]')
  .description('Create a Vue router file.')
  .option('-p, --path', 'The path where to put the route file.')
  .action()

/** Vuex Commands */
program
  .command('create:store <store-name> [options]')
  .description('Create a Vuex store directory and index file for a component.')
  .option('-f, --flat', 'Create a single index.js containing core Vuex features.')
  .option('-s, --spread', 'Spreads Vuex features into their own files and imported into an index file.')
  .action()

program.parse(process.argv)

#!/usr/bin/env node --harmony

import program from 'commander'
import fs from 'fs'
import { version as __VERSION__ } from '../package.json'

program
  .version(__VERSION__)
  .description(
    'A command line tool for quickly generating and scaffolding Vue files.'
  )

program
  .parse(process.argv)

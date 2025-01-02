#!/usr/bin/env node

import { Command } from 'commander'
import { config } from 'dotenv'
import { edenredCommand } from './commands/edenredCommand'
import { actualCommand } from './commands/actualCommand'

config()

const program = new Command()

program.version('0.1.0').description('CLI for managing Edenred API')

const username = process.env.EDENRED_USERID
const password = process.env.EDENRED_PIN

if (!username || !password) {
  console.error('Username or password not found in the .env file.')
  process.exit(1)
}

edenredCommand(program)
actualCommand(program)

program.parse(process.argv)

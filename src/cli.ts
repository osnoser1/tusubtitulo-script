import * as findUp from 'find-up';
import * as yargs from 'yargs';

import { readFileSync } from 'fs';
import { configFileName } from './constaints';

const configPath = findUp.sync([configFileName]);
const config = configPath ? JSON.parse(readFileSync(configPath).toString()) : {};
const argv = yargs
    .config(config)
    .version()
    .usage('Usage: $0 <command> [options]')
    .commandDir('cmds')
    .help()
    .argv;

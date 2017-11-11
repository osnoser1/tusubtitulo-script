import * as findUp from 'find-up';
import * as yargs from 'yargs';

import { readFileSync } from 'fs';

const configPath = findUp.sync(['.tu-subtitulo-script-rc', '.tu-subtitulo-script-rc.json']);
const config = configPath ? JSON.parse(readFileSync(configPath).toString()) : {};
const argv = yargs
    .config(config)
    .commandDir('cmds')
    .help()
    .argv;

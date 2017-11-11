export const command = 'configure <command>';
export const aliases = ['config', 'c'];
export const describe = 'Access configuration';
export const builder = (yargs) => yargs.commandDir('configure_cmds');
export const handler = () => console.log('configure command executed!');

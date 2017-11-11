export const command = 'get <key>';
export const describe = 'Get a config variable';
export const handler = (argv) => console.log(`setting ${argv.key}`);

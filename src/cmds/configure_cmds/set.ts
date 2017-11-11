export const command = 'get <key> [value]';
export const describe = 'Set a config variable';
export const handler = argv => console.log(`setting ${argv.key} to ${argv.value}`);

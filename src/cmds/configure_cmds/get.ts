import { readFile } from "../../utils/fs";
import { configFileName } from "../../constaints";

export const command = 'get <key>';
export const describe = 'Get a config variable';
export const handler = async (argv) => {
    let file = await readFile(configFileName).catch(_ => {});
    const config = JSON.parse(file || '{}');
    console.log(config[argv.key]);
};

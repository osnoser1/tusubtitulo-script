import { readFile } from "../../utils/fs";
import { configFileName } from "../../constaints";

export const command = 'list';
export const describe = 'List all config variables';
export const handler = async (argv) => {
    let file = await readFile(configFileName).catch(_ => {});
    const config = JSON.parse(file || '{}');
    console.log(config);
};


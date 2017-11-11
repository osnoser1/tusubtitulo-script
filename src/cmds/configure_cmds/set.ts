import { readFile, writeFile } from "../../utils/fs";
import { configFileName } from "../../constaints";

export const command = 'set <key> [value]';
export const describe = 'Set a config variable';
export const handler = async argv => {
    let file = await readConfigFile(configFileName);
    const config = JSON.parse(file);
    config[argv.key] = argv.value;
    await writeFile(configFileName, JSON.stringify(config));
};

async function readConfigFile(fileName: string) {
    return await readFile(fileName)
        .catch(_ => '{}');;
}


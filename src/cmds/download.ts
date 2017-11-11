import { downloadSubtitle } from "../core/download-subtitle";

export const command = 'download [options]';
export const aliases = 'd';
export const describe = 'Download the subtitle from page';
export const builder = {
    id: {
        alias: 'i',
        describe: 'Subtitle id',
        demandOption: true,
    },
    lang: {
        alias: 'l',
        describe: 'Subtitle language',
        demandOption: true,
    },
    mixed: {
        alias: 'm',
        describe: 'Add sequences in english if it is not available in the selected language',
        boolean: true,
        default: true,
    },
};
export const handler = (argv) => downloadSubtitle(argv)

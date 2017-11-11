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
};
export const handler = () => console.log('download command executed!');

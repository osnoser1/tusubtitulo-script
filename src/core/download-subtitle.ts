import { utc } from 'moment';
import * as FormData from 'form-data';

import { fetch } from '../utils/http';
import { writeFile } from '../utils/fs';
import { ISubtitleLine } from './subtitles/subtitle';
import { ISequences } from './tu-subtitulo/load-response/sequences';
import { sequencesToSubtitle } from './tu-subtitulo/utils';
import { subtitleToSrt } from './subtitles/utils';
import { ISequencesAjaxGetLines } from './tu-subtitulo/ajax-get-lines-response/sequences-ajax-get-lines';

type DownloadSubtitleArgs = { downloadPath?: string, cookie: string, id: string, lang: string, mixed: boolean };

const url = 'https://tusubtitulo.com';

export const downloadSubtitle = async (
    { downloadPath, cookie, id, lang, mixed }: DownloadSubtitleArgs
) => {
    const headers = { Cookie: cookie };
    const form = { subID: id, lang, fversion: 0 };

    const data = await getSubtitle(form, headers);
    if (data.lang.status === 'error' || data.english.status === 'error') { return; }

    const sequences = data.lang.message.sequences as ISequences;
    const englishSequences = data.english.message as ISequencesAjaxGetLines;
    const subtitle = mixed
        ? sequencesToSubtitle(sequences, englishSequences)
        : sequencesToSubtitle(sequences);
    const srt = subtitleToSrt(subtitle);
    const path = downloadPath || `${process.env.HOME || process.env.USERPROFILE}downloads`;
    await writeFile(`${path}/${id}.srt`, srt);
}

const getSubtitle = async (form: { subID: string; lang: string; fversion: number; }, headers: { Cookie: string; }) => ({
    lang: JSON.parse(await fetch(
        `${url}/translate/load`,
        { method: 'POST', form, headers }
    )),
    english: JSON.parse(await fetch(
        `${url}/ajax_getLines.php?subID=${form.subID}&lang=1&fversion=0`,
        { method: 'POST', headers }
    )),
});

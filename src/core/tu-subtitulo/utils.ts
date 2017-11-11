import { ISequences } from "./load-response/sequences";
import { utc } from "moment";
import { ISubtitleLine } from "../subtitles/subtitle";
import { ISequencesAjaxGetLines } from "./ajax-get-lines-response/sequences-ajax-get-lines";

export function sequencesToSubtitle(sequences: ISequences, englishSequences?: ISequencesAjaxGetLines) {
    const dateFormat = 'HH:mm:ss,SSS';
    return englishSequences
        ? mergeSequences(sequences, englishSequences, dateFormat)
        : singleSequences(sequences, dateFormat);
}

function singleSequences(sequences: ISequences, dateFormat: string) {
    return Object.keys(sequences).map(key => ({
        number: sequences[key].Number,
        text: sequences[key].Text,
        times: `${utc(sequences[key].StartTime).format(dateFormat)} --> ${utc(sequences[key].EndTime).format(dateFormat)}`,
    } as ISubtitleLine));
}

function mergeSequences(sequences: ISequences, englishSequences: ISequencesAjaxGetLines, dateFormat: string) {
    return Object.keys(englishSequences).map(key => ({
        number: Number(key),
        text: sequences[key] && sequences[key].Text || englishSequences[key].text,
        times: `${
            utc(Number(englishSequences[key].tstart)).format(dateFormat)
        } --> ${
            utc(Number(englishSequences[key].tend)).format(dateFormat)
        }`,
    } as ISubtitleLine));
}

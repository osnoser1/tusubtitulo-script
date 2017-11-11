import { ISubtitleLine } from "./subtitle";

export const subtitleToSrt = (subtitle: ISubtitleLine[]) =>
    subtitle.reduce((prev, cur) => `${prev}${cur.number}\n${cur.times}\n${cur.text}\n\n`, '');

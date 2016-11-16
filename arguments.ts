import { LineArgument } from './line-argument';

export const Commands = {
    Id: 'id',
    Lang: 'lang'
}

export const Arguments: LineArgument[] = [
    { command: Commands.Id, required: true, hasValue: true },
    { command: Commands.Lang, required: true, hasValue: true }
];
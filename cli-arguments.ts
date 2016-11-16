import { LineArgument } from './line-argument';
import { Arguments } from './arguments';
/**
 * CliArguments
 */
export class CliArguments {

    [propName: string]: any;

    constructor() {
        this.loadArguments();
        this.checkRequiredArguments();
    }

    private loadArguments(): void {
        for (var i = 2; i < process.argv.length; i++) {
            const arg = this.getArgument(process.argv[i].substr(2), i);
            this[arg.lineArgument.command] = arg.value;
            if(arg.lineArgument.hasValue) i++;
        }
    }

    private getArgument(argv: string, index: number): { lineArgument: LineArgument, value?: string | number | boolean } {
        const arg = Arguments.find(value => value.command === argv);
        if (arg === undefined) {
            throw new TypeError("Argumento inválido.");
        }
        return { lineArgument: arg, value: arg.hasValue ? process.argv[index + 1] : undefined };
    }

    private checkRequiredArguments(): void {
        const arg = Arguments.find(arg => !!arg.required && !this[arg.command]);
        if(arg) {
            throw new TypeError(`Argumento requerido faltante: '${arg.command}'`);
        }
    }

}
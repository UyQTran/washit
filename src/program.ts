export interface ProgramOptions {
    degreesCelsius: number;
    durationMinutes: number;
}

export default class Program {
    private _options: ProgramOptions;

    constructor(options: ProgramOptions) {
        this._options = options;
    }

    get options(): ProgramOptions {
        return this._options;
    }

    set options(value: ProgramOptions) {
        this._options = value;
    }
}
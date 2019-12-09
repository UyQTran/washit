import Program from "./program";
import moment = require("moment");

class Booking {
    private _program: Program;
    private _date: moment.Moment;

    constructor(program: Program, date: moment.Moment) {
        this._program = program;
        this._date = date;
    }

    get program(): Program {
        return this._program;
    }

    set program(value: Program) {
        this._program = value;
    }

    get date(): moment.Moment {
        return this._date;
    }

    set date(value: moment.Moment) {
        this._date = value;
    }

}

export default Booking;
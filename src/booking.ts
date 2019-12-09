import Program from "./program";
import moment from "moment";
import uuid from 'uuid-random';

class Booking {
    private _program: Program;
    private _date: moment.Moment;
    private _id: string;

    constructor(program: Program, date: moment.Moment) {
        this._program = program;
        this._date = date;
        this._id = uuid()
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

    get id(): string {
        return this._id;
    }
}

export default Booking;
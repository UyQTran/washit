import Booking from "./booking";

export interface ProgramOptions {
    degreesCelsius: number;
    durationMinutes: number;
}

class WashIt {
    private _bookingList: Booking[];

    constructor() {
        this._bookingList = [];
    }

    addBooking(booking: Booking) {

        this._bookingList.push(booking);
    }

    get bookingList(): Booking[] {
        return this._bookingList;
    }
}

export default WashIt;
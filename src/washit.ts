import Booking from "./booking";

class WashIt {
    private _bookingList: Booking[];

    constructor() {
        this._bookingList = [];
    }

    addBooking(bookingToAdd: Booking) {
        const MINUTES = 'minutes';
        const filterOverlappingBookings = (booking: Booking) => {
            let isBookingToAddAfterCurrent = bookingToAdd.date.isAfter(booking.date.add(booking.program.options.durationMinutes, MINUTES));
            let isBookingToAddBeforeCurrent = bookingToAdd.date.isBefore(booking.date);
            return !(isBookingToAddAfterCurrent || isBookingToAddBeforeCurrent);
        };
        const overlappingBookingCount = this.bookingList.filter(filterOverlappingBookings).length;

        if(overlappingBookingCount) {
        } else {
            this._bookingList.push(bookingToAdd);
        }
        return overlappingBookingCount;
    }

    get bookingList(): Booking[] {
        return this._bookingList;
    }
}

export default WashIt;
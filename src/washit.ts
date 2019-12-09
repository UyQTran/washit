import Booking from "./booking";
import moment = require("moment");

export interface BookingQueue {
    [key: string]: Booking[];
}
export interface BookingMap {
    [key: string]: Booking | undefined;
}

const MINUTES = 'minutes';
const TIME_MINUTE_FRAGMENT = 30;

class WashIt {
    private _bookingQueue: BookingQueue;
    private _bookingMap: BookingMap;

    constructor() {
        this._bookingQueue = {};
        this._bookingMap = {};
    }

    addBooking(bookingToAdd: Booking) {
        const overlappingBookingCount = this.getOverlappingBookingCount(bookingToAdd);

        if(overlappingBookingCount === 0) {
            this._bookingMap[bookingToAdd.id] = bookingToAdd;
        }

        this.handleAddBooking(bookingToAdd);

        return overlappingBookingCount;
    }

    private handleAddBooking(bookingToAdd: Booking) {
        for(let i = 0; i <= bookingToAdd.program.options.durationMinutes; i+= TIME_MINUTE_FRAGMENT) {
            this._bookingQueue[this.getBookingQueueIndex(bookingToAdd, i)] = [bookingToAdd];
        }
    }

    private getOverlappingBookingCount(bookingToAdd: Booking) {
        let highestOverlappingBookingCount = 0;

        for(let i = 0; i <= bookingToAdd.program.options.durationMinutes; i+= TIME_MINUTE_FRAGMENT) {
            const timeFragmentBookingList = this._bookingQueue[this.getBookingQueueIndex(bookingToAdd, i)];
            const currentOverLappingCount = timeFragmentBookingList ? timeFragmentBookingList.length : 0;
            if(highestOverlappingBookingCount < currentOverLappingCount) {
                highestOverlappingBookingCount = currentOverLappingCount;
            }
        }
        return highestOverlappingBookingCount;
    }

    getBookingQueueIndex(booking: Booking, index: number) {
        return moment(booking.date).add(index, MINUTES).toLocaleString();
    }

    cancelBooking(bookingId: string) {
        const bookingToDelete = this._bookingMap[bookingId];
        if(!bookingToDelete) {
            return false;
        }
        const bookingToDeleteId = bookingToDelete.id;
        delete this._bookingMap[bookingId];

        return true;
    }

    get bookingQueue(): BookingQueue {
        return this._bookingQueue;
    }

    get bookingMap(): BookingMap {
        return this._bookingMap;
    }
}

export default WashIt;
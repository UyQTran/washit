import Booking from "./booking";
import moment from "moment";
import {sendBookingNotification} from "./emailer";

export interface BookingQueue {
    [key: string]: Booking[];
}
export interface BookingMap {
    [key: string]: Booking | undefined;
}

const MINUTES = 'minutes';
const TIME_MINUTE_FRAGMENT = 30;

export default class BookingSystem {
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

    getBookingQueueIndex(booking: Booking, index: number) {
        return moment(booking.date).add(index, MINUTES).toLocaleString();
    }

    cancelBooking(bookingId: string) {
        const bookingToDelete = this._bookingMap[bookingId];
        if(!bookingToDelete) {
            return false;
        }

        delete this._bookingMap[bookingId];
        this.deleteBookingFromQueue(bookingToDelete);

        const bookingToReplaceDeletedBooking = this._bookingQueue[bookingToDelete.date.toLocaleString()].shift();

        if(bookingToReplaceDeletedBooking) {
            this._bookingMap[bookingToReplaceDeletedBooking.id] = bookingToReplaceDeletedBooking;
            sendBookingNotification(bookingToReplaceDeletedBooking);
        }

        return true;
    }

    private handleAddBooking(bookingToAdd: Booking) {
        for(let i = 0; i <= bookingToAdd.program.options.durationMinutes; i+= TIME_MINUTE_FRAGMENT) {
            if(this._bookingQueue[this.getBookingQueueIndex(bookingToAdd, i)]) {
                this._bookingQueue[this.getBookingQueueIndex(bookingToAdd, i)].push(bookingToAdd);
            } else {
                this._bookingQueue[this.getBookingQueueIndex(bookingToAdd, i)] = [bookingToAdd];
            }
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

    private deleteBookingFromQueue(bookingToDelete: Booking) {
        for(let i = 0; i < bookingToDelete.program.options.durationMinutes; i+=TIME_MINUTE_FRAGMENT) {
            this._bookingQueue[this.getBookingQueueIndex(bookingToDelete, i)].shift();
        }
    }

    get bookingMap(): BookingMap {
        return this._bookingMap;
    }
}
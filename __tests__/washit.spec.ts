import Program from "../src/program";
import WashIt from "../src/washit";
import Booking from "../src/booking";
import moment = require("moment");
import {timeFormat} from "../src/util/timeFormat";

describe("Tests for WashIt class", () => {
    test("Should be able add booking", () => {
        const washit = new WashIt();
        const program  = new Program({degreesCelsius: 30, durationMinutes: 20});
        const date = moment('12.12.12');
        const booking = new Booking(program, date);
        washit.addBooking(booking);

        const expectedBookingListLength = 1;
        expect(washit.bookingList.length).toEqual(expectedBookingListLength);
    });
    test("Should get waiting queue index", () => {
        const washit = new WashIt();
        const program  = new Program({degreesCelsius: 30, durationMinutes: 20});
        const date = moment('12.12.12-10:30', timeFormat);
        const booking = new Booking(program, date);
        washit.addBooking(booking);
        const queueIndex = washit.addBooking(booking);

        const expectedBookingQueueIndex = 1;
        expect(queueIndex).toEqual(expectedBookingQueueIndex);
    });
    test("Should still put in waiting list when not fully overlapped", () => {
        const washit = new WashIt();
        const program  = new Program({degreesCelsius: 30, durationMinutes: 20});
        const date = moment('12.12.12-10:30', timeFormat);
        const date1 = moment('12.12.12-10:40', timeFormat);
        const booking = new Booking(program, date);
        const booking1 = new Booking(program, date1);
        washit.addBooking(booking);
        washit.addBooking(booking1);
        const queueIndex = washit.addBooking(booking);

        const expectedBookingQueueIndex = 1;
        expect(queueIndex).toEqual(expectedBookingQueueIndex);
    });
});
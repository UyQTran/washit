import Program from "../src/program";
import BookingSystem from "../src/bookingSystem";
import Booking from "../src/booking";
import moment = require("moment");
import {timeFormat} from "../src/util/timeFormat";
import User from "../src/user";

describe("Tests for BookingSystem class", () => {
    let washIt = new BookingSystem();
    let program  = new Program({degreesCelsius: 30, durationMinutes: 20});
    beforeEach(() => {
        washIt = new BookingSystem();
    });

    it("Should be able add booking", () => {
        const date = moment('12.12.12');
        const user = new User('heidi@gmail.com');
        const booking = new Booking(program, date, user);
        washIt.addBooking(booking);

        const expectedBookingMapSize = 1;
        expect(Object.keys(washIt.bookingMap).length).toEqual(expectedBookingMapSize);
    });

    it("Should get waiting queue index", () => {
        const date = moment('12.12.12-10:30', timeFormat);
        const user = new User('heidi@gmail.com');
        const booking = new Booking(program, date, user);
        washIt.addBooking(booking);
        const queueIndex = washIt.addBooking(booking);

        const expectedBookingQueueIndex = 1;
        expect(queueIndex).toEqual(expectedBookingQueueIndex);
    });

    it("Should still put in waiting list when not fully overlapped", () => {
        const date = moment('12.12.12-10:30', timeFormat);
        const date1 = moment('12.12.12-10:40', timeFormat);
        const user = new User('heidi@gmail.com');
        const booking = new Booking(program, date, user);
        const user1 = new User('hans@gmail.com');
        const booking1 = new Booking(program, date1, user1);
        washIt.addBooking(booking);
        washIt.addBooking(booking1);
        const queueIndex = washIt.addBooking(booking);

        const expectedBookingQueueIndex = 1;
        expect(queueIndex).toEqual(expectedBookingQueueIndex);
    });

    it("Should be able to cancel booking", () => {
        const date = moment('12.12.12-10:30', timeFormat);
        const user = new User('heidi@gmail.com');
        const booking = new Booking(program, date, user);
        washIt.addBooking(booking);
        const bookingId = booking.id;
        washIt.cancelBooking(bookingId);

        const expectedBookingListLength = 0;
        expect(Object.keys(washIt.bookingMap).length).toEqual(expectedBookingListLength);
    });

    it("Should be able shift queue if queue is present and booking is canceled", () => {
        const date = moment('12.12.12-10:30', timeFormat);
        const user = new User('heidi@gmail.com');
        const booking = new Booking(program, date, user);
        washIt.addBooking(booking);

        const date1 = moment('12.12.12-10:30', timeFormat);
        const user1 = new User('hans@gmail.com');
        const booking1 = new Booking(program, date1, user1);
        washIt.addBooking(booking1);
        const bookingId = booking.id;
        washIt.cancelBooking(bookingId);

        const expectedBookingListLength = 1;
        expect(Object.keys(washIt.bookingMap).length).toEqual(expectedBookingListLength);
    });
});
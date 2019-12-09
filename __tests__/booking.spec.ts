
import moment = require("moment");
import Program from "../src/program";
import Booking from "../src/booking";
import User from "../src/user";


describe("Tests for Booking class", () => {
    test("Should be able to init object", () => {
        const program  = new Program({degreesCelsius: 30, durationMinutes: 20});
        const date = moment('12.12.12');
        const user = new User('heidi@gmail.com');
        const booking = new Booking(program, date, user);

        expect(booking.program).toEqual(program);
        expect(booking.date).toEqual(date);
    });
});
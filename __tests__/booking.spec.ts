
import moment = require("moment");
import Program from "../src/program";
import Booking from "../src/booking";


describe("Tests for Booking class", () => {
    test("Should be able to init object", () => {
        const program  = new Program({degreesCelsius: 30, durationMinutes: 20});
        const date = moment('12.12.12', 'DD.MM.YY:');
        const booking = new Booking(program, date);

        expect(booking.program).toEqual(program);
        expect(booking.date).toEqual(date);
    });
});
import Program from "../src/program";

describe("Tests for Program class", () => {
    test("Should be able set options properly", () => {
        const options = {
            degreesCelsius: 60,
            durationMinutes: 90
        };
        const program = new Program(options);
        expect(program.options.degreesCelsius).toEqual(options.degreesCelsius);
        expect(program.options.durationMinutes).toEqual(options.durationMinutes);
    });
});
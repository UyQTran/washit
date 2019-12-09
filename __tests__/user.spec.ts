import User from "../src/user";

describe("Tests for User class", () => {
    test("Should be able set name properly", () => {
        const userName = "Uy Tran";
        const user = new User(userName);
        expect(user.name).toEqual(userName);
    });
});
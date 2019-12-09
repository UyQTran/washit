import User from "../src/user";

describe("Tests for User class", () => {
    it("Should be able set name properly", () => {
        const userEmail = "heidi@gmail.com";
        const user = new User(userEmail);
        expect(user.email).toEqual(userEmail);
    });
});
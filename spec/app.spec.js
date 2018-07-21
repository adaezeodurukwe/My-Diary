var add = require("../app");

describe("add function", () =>{
    it("calculates x + y = z", () => {
        expect(add(10,5)).toEqual(15)
    });
});
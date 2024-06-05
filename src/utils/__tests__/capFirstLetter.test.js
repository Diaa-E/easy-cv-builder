import { describe, expect, it } from "vitest";
import { capFirstLetter } from "../capFirstLetter";

describe("Start case converter function", () => {

    it("Capitalizes first letter of a single word", () => {

        expect(capFirstLetter("text")).toBe("Text");
    });

    it("Capitalizes first letter of multiple words seperated by a white space", () => {

        expect(capFirstLetter("this is text")).toBe("This Is Text");
    });

    it("Ignores underscores and dots and treats them as extension to words", () => {

        expect(capFirstLetter("this_is_text")).toBe("This_is_text");
    });

    it("ignores multiple consecutive white spaces", () => {

        expect(capFirstLetter("this  is text")).toBe("This  Is Text");
    });

    it("Ignores white space at the end - user is still typing case", () => {

        expect(capFirstLetter("this ")).toBe("This ");
    });

    it("Ignores characters that have no upper case", () => {

        expect(capFirstLetter("12")).toBe("12");
        expect(capFirstLetter("#h")).toBe("#h");
    });

    it("Capitalizes a name initial followed by a dot", () => {

        expect(capFirstLetter("thomas h. johnson")).toBe("Thomas H. Johnson");
    });
})
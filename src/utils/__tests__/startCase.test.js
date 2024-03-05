import { describe, expect, it } from "vitest";
import { getStartCase } from "../startCase";

describe("Start case converter function", () => {

    it("Capitalizes first letter of a single word", () => {

        expect(getStartCase("text")).toBe("Text");
    });

    it("Capitalizes first letter of multiple words seperated by a white space", () => {

        expect(getStartCase("this is text")).toBe("This Is Text");
    });

    it("Ignores underscores and dots and treats them as extension to words", () => {

        expect(getStartCase("this_is_text")).toBe("This_is_text");
    });

    it("ignores multiple consecutive white spaces", () => {

        expect(getStartCase("this  is text")).toBe("This  Is Text");
    });

    it("Ignores white space at the end - user is still typing case", () => {

        expect(getStartCase("this ")).toBe("This ");
    });

    it("Ignores characters that have no upper case", () => {

        expect(getStartCase("12")).toBe("12");
        expect(getStartCase("#h")).toBe("#h");
    });

    it("Capitalizes a name initial followed by a dot", () => {

        expect(getStartCase("thomas h. johnson")).toBe("Thomas H. Johnson");
    });
})
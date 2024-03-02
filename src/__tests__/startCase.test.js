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

    it("Removes multiple consecutive white spaces", () => {

        expect(getStartCase("this  is text")).toBe("This Is Text");
    });

    it("Capitalizes a name initial followed by a dot", () => {

        expect(getStartCase("thomas h. johnson")).toBe("Thomas H. Johnson");
    });
})
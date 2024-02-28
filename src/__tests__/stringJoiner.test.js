import { describe, expect, it } from "vitest";
import { joinString } from "../stringJoiner";

describe("Advanced string joiner function", () => {

    it("Joins an array with non empty strings", () => {

        expect(joinString(["text1", "text2", "text3"], ", ")).toBe("text1, text2, text3");
    });

    it("Ignores an empty string in the middle of the array", () => {

        expect(joinString(["text1", "", "text3"], ", ")).toBe("text1, text3");
    });

    it("Ignores an empty string at the start of the array", () => {

        expect(joinString(["", "text2", "text3"], ", ")).toBe("text2, text3");
    });

    it("Ignores an empty string at the end of the array", () => {

        expect(joinString(["text1", "text2", ""], ", ")).toBe("text1, text2");
    });

    it("Returns null for an array of empty strings", () => {

        expect(joinString(["", "", ""], ", ")).toBeNull();
    });

    it("Returns null for an empty array", () => {

        expect(joinString([], ", ")).toBeNull();
    });
})
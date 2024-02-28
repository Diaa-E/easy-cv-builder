import { describe, expect, it } from "vitest";
import { isEmptySection } from "../emptySectionDetector";

describe("Empty section detector function", () => {

    it("Returns true for an empty array", () => {

        expect(isEmptySection([])).toBe(true);
    });

    it("Returns true for a non-empty array with all hidden keys set to true", () => {

        expect(isEmptySection([{hidden: true}, {hidden: true}, {hidden: true}, {hidden: true}])).toBe(true);
    });

    it("REturns false for a non-empty array with all hidden keys set to false", () => {

        expect(isEmptySection([{hidden: false}, {hidden: false}, {hidden: false}, {hidden: false}])).toBe(false);
    });

    it("Returns false for a non-empty array with some hidden keys set to false", () => {

        expect(isEmptySection([{hidden: false}, {hidden: true}, {hidden: false}, {hidden: true}])).toBe(false);
    });

    it("Returns false for a non-empty array with one hidden key set to false", () => {

        expect(isEmptySection([{hidden: true}, {hidden: true}, {hidden: true}, {hidden: false}])).toBe(false);
    });
});
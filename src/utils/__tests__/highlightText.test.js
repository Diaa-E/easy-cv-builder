import { describe, expect, it } from "vitest";
import { highlightText } from "../highlightText";

describe("Highlight text function", () => {

    it("Highlights text marked at the start of a string", () => {

        expect(highlightText("*marked* some text", "*")).toEqual([
            {
                value: "marked",
                highlight: true
            },
            {
                value: " some text",
                highlight: false
            }
        ]);
    });

    it("Highlights text marked at the end of a string", () => {

        expect(highlightText("some text *marked*", "*")).toEqual([
            {
                value: "some text ",
                highlight: false,
            },
            {
                value: "marked",
                highlight: true,
            },
        ]);
    });

    it("Highlights text marked in the middle of a string", () => {

        expect(highlightText("some text *marked* more text", "*")).toEqual([
            {
                value: "some text ",
                highlight: false
            },
            {
                value: "marked",
                highlight: true,
            },
            {
                value: " more text",
                highlight: false,
            }
        ]);
    });

    it("Highlights multiple marked sections of a string", () => {

        expect(highlightText("some text *marked* more text *another marked*", "*")).toEqual([
            {
                value: "some text ",
                highlight: false,
            },
            {
                value: "marked",
                highlight: true,
            },
            {
                value: " more text ",
                highlight: false
            },
            {
                value: "another marked",
                highlight: true,
            },
        ]);
    });

    it("Returns string unchanged if no sections are marked", () => {

        expect(highlightText("some text", "*")).toEqual([
            {
                value: "some text",
                highlight: false
            }
        ]);
    });

    it("Throws an error if the number of * marks is not even (end or start is undetermined)", () => {

        expect(() => highlightText("some *text", "*")).toThrowError();
    });
});
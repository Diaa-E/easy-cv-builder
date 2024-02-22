import { describe, expect, it, vi } from "vitest";
import { testColor, testFont, testLayout } from "../draftTest";

vi.mock("../fonts.js", () => {

    return {
        default: [
            {
                name: "",
                value: "font1"
            },
            {
                name: "",
                value: "font2"
            }
        ]
    };
});

vi.mock("../layouts.js", () => {

    return {
        default: [
            {
                name: "",
                value: "layout1"
            },
            {
                name: "",
                value: "layout2"
            }
        ]
    }
});

describe("Accent color validity", () => {
   
    it("Returns true for a valid Hex color with no alpha channel", () => {

        expect(testColor("#000000")).toBe(true);
        expect(testColor("#ffffff")).toBe(true);
        expect(testColor("#abcdef")).toBe(true);
    });

    it("Returns false for a valid Hex value longer than 6 digits + pound", () => {

        expect(testColor("#0000000")).toBe(false);
        expect(testColor("#abcdeffecd")).toBe(false);
    });

    it("Returns false for a valid Hex value shorter than 6 digits + pound", () => {

        expect(testColor("#abc43")).toBe(false);
        expect(testColor("#f")).toBe(false);
    });

    it("Returns false for a valid Hex value without pound", () => {

        expect(testColor("ffffff")).toBe(false);
        expect(testColor("01fc54")).toBe(false);
    });

    it("Returns false for an invalid Hex value of 6 digits + pound", () => {

        expect(testColor("#zabcde")).toBe(false);
        expect(testColor("#0abcdg")).toBe(false);
        expect(testColor("#1azcde")).toBe(false);
    });
});

describe("Layout validity", () => {

    it("Returns true for a layout included in the layouts module", () => {

        expect(testLayout("layout1")).toBe(true);
    });

    it("Returns falsee for a layout not included in the layouts module", () => {

        expect(testLayout("text")).toBe(false);
    });
});

describe("Font validity", () => {

    it("Returns true for a font included in the fonts module", () => {

        expect(testFont("font1")).toBe(true);
    });

    it("Returns false for a font not included in fonts module", () => {

        expect(testFont("text")).toBe(false);
    });
});
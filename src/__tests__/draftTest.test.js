import { describe, expect, it, vi } from "vitest";
import { testFont } from "../draftTest";

vi.mock("../fonts.js", async (importOriginal) => {

    const mod = await importOriginal();

    return {
        ...mod,
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

describe("Font validity", () => {

    it("Returns true for a font included in the fonts module", () => {

        expect(testFont("font1")).toBe(true);
    });

    it("Returns false for a font not included in fonts module", () => {

        expect(testFont("text")).toBe(false);
    });
});
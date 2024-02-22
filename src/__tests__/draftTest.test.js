import { describe, expect, it, vi } from "vitest";
import { testColor, testFont, testLayout, testLinks } from "../draftTest";

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

vi.mock("../linkIconsBarrel.js", () => {

    return{
        default: [
            {
                name: "icon1",
                icon: ""
            },
            {
                name: "icon2",
                icon: ""
            },
            {
                name: "icon3",
                icon: ""
            }
        ]
    }
});

describe("Links section validity", () => {

    function setup()
    {
        return [
            {
                id: 0,
                url: "website.com",
                icon: "icon1",
                hidden: false,
            },
            {
                id: 1,
                url: "place.com",
                icon: "icon2",
                hidden: false,
            },
            {
                id: 2,
                url: "game.net",
                icon: "icon3",
                hidden: true,
            },
            {
                id: 3,
                url: "organization.org",
                icon: "icon1",
                hidden: false,
            },
        ];
    }

    it("Returns true for valid links", () => {

        const validLinks = setup();

        expect(testLinks(validLinks)).toBe(true);
    });

    it("Returns true for valid links after serialization", () => {

        const validLinks = setup();

        expect(JSON.parse(JSON.stringify(testLinks(validLinks)))).toBe(true);
    });

    it("Returns false for repetetive IDs", () => {

        const invalidLinks = setup();
        invalidLinks[0].id = invalidLinks[invalidLinks.length - 1].id;

        expect(testLinks(invalidLinks)).toBe(false);
        expect(testLinks(invalidLinks.reverse())).toBe(false); //make sure order does not affect result
    });

    it("Returns false for icons not included in the link icons module", () => {

        const invalidLinks = setup();
        invalidLinks[0].icon = "text";

        expect(testLinks(invalidLinks)).toBe(false);
        expect(testLinks(invalidLinks.reverse())).toBe(false);
    });

    it("Returns false for non boolean hidden value", () => {

        const invalidLinks = setup();
        invalidLinks[0].hidden = "text";

        expect(testLinks(invalidLinks)).toBe(false);
        expect(testLinks(invalidLinks.reverse())).toBe(false);
    });
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
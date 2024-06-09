import { describe, expect, it, vi } from "vitest";
import { 
    testDraftValidity,
    testObject,
    testArray
} from "../draftValidation";

vi.mock("../../data/fonts.js", () => {

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

vi.mock("../../data/layouts.js", () => {

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

vi.mock("../../data/linkIconsBarrel.js", () => {

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

vi.mock("../../data/orderModes.js", () => {

    return {
        default: [
            {
                name: "order one",
                value: "order1"
            },
            {
                name: "order two",
                value: "order2"
            }
        ]
    }
});

vi.mock("../../data/levelModes.js", () => {

    return {
        default: [
            {
                name: "level mode one",
                value: "levelMode1"
            },
            {
                name: "level mode two",
                value: "levelMode2",
            }
        ]
    }
});

describe("Draft validity", () => {

    function setup()
    {
        return {
            personalInfo: {
                fullName: "",
                profession: "",
                address: "",
                zip: ""
            },
            contact: {
                phoneNumber: "",
                email: "",
            },
            accentColor: "#ffffff",
            layout: "layout2",
            font: "font1",
            order: "order2",
            levelMode: "levelMode1",
            education: [
                {
                    id: "0",
                    degree: "",
                    school: "",
                    location: "",
                    start: "",
                    end: "",
                    hidden: false
                },
                {
                    id: "1",
                    degree: "",
                    school: "",
                    location: "",
                    start: "",
                    end: "",
                    hidden: true
                },
            ],
            experience: [
                {
                    id: "0",
                    company: "",
                    location: "",
                    position: "",
                    start: "",
                    end: "",
                    details: "",
                    hidden: false
                },
                {
                    id: "1",
                    company: "",
                    location: "",
                    position: "",
                    start: "",
                    end: "",
                    details: "",
                    hidden: true
                },
            ],
            links: [
                {
                    id: "0",
                    url: "website.com",
                    icon: "icon1",
                    hidden: false,
                },
                {
                    id: "1",
                    url: "website.org",
                    icon: "icon2",
                    hidden: true,
                },
                {
                    id: "2",
                    url: "place.net",
                    icon: "icon3",
                    hidden: false,
                },
            ],
            skills: [
                {
                    id: "0",
                    name: "",
                    level: 100,
                    hidden: false,
                    showLevel: true,
                },
                {
                    id: "1",
                    name: "",
                    level: 40,
                    hidden: true,
                    showLevel: true,
                },
                {
                    id: "2",
                    name: "",
                    level: 20,
                    hidden: false,
                    showLevel: false,
                },
            ],
            languages: [
                {
                    id: "0",
                    name: "",
                    level: 100,
                    hidden: false,
                    showLevel: true,
                },
                {
                    id: "1",
                    name: "",
                    level: 40,
                    hidden: true,
                    showLevel: true,
                },
                {
                    id: "2",
                    name: "",
                    level: 20,
                    hidden: false,
                    showLevel: false,
                },
            ],
        };
    }

    const fullErrorLog = [

        "accentColor",
        "order",
        "font",
        "layout",
        "links",
        "skills",
        "languages",
        "education",
        "experience",
        "personalInfo",
        "contact",
        "levelMode"
    ];

    it("Returns an empty array for a valid draft", () => {

        const validDraft = setup();

        expect(testDraftValidity(validDraft)).toEqual([]);
    });

    it("Returns an empty array for a valid draft after serialization", () => {

        const validDraft = setup();

        expect(JSON.parse(JSON.stringify(testDraftValidity(validDraft)))).toEqual([]);
    });

    it("Returns 'accentColor' in an array for invalid accent color value", () => {

        const invalidDraft = setup();
        invalidDraft.accentColor = "text";

        expect(testDraftValidity(invalidDraft)).toEqual(["accentColor"]);
    });

    it("Returns 'font' in an array for invalid font value", () => {

        const invalidDraft = setup();
        invalidDraft.font = "text";

        expect(testDraftValidity(invalidDraft)).toEqual(["font"]);
    });

    it("Returns 'layout' in an array for invalid layout value", () => {

        const invalidDraft = setup();
        invalidDraft.layout = "text";

        expect(testDraftValidity(invalidDraft)).toEqual(["layout"]);
    });

    it("Returns 'links' in an array for invalid links", () => {

        const invalidDraft = setup();
        invalidDraft.links = undefined;

        expect(testDraftValidity(invalidDraft)).toEqual(["links"]);
    });

    it("Returns 'skills' in an array for invalid skills", () => {

        const invalidDraft = setup();
        invalidDraft.skills = undefined;

        expect(testDraftValidity(invalidDraft)).toEqual(["skills"]);
    });

    it("Returns 'languages' in an array for invalid languages", () => {

        const invalidDraft = setup();
        invalidDraft.languages = undefined;

        expect(testDraftValidity(invalidDraft)).toEqual(["languages"]);
    });

    it("Returns 'education' in an array for invalid education", () => {

        const invalidDraft = setup();
        invalidDraft.education = undefined;

        expect(testDraftValidity(invalidDraft)).toEqual(["education"]);
    });

    it("Returns 'experience' in an array for invalid experience", () => {

        const invalidDraft = setup();
        invalidDraft.experience = undefined;

        expect(testDraftValidity(invalidDraft)).toEqual(["experience"]);
    });

    it("Returns all fields in an array if the draft is not a valid object", () => {

        //sorting removes the headache of ordering the array in a specific order
        expect(testDraftValidity(undefined).sort()).toEqual(fullErrorLog.sort());
        expect(testDraftValidity(null).sort()).toEqual(fullErrorLog.sort());
        expect(testDraftValidity("text").sort()).toEqual(fullErrorLog.sort());
        expect(testDraftValidity(15).sort()).toEqual(fullErrorLog.sort());
        expect(testDraftValidity({}).sort()).toEqual(fullErrorLog.sort());
        expect(testDraftValidity([]).sort()).toEqual(fullErrorLog.sort());
        expect(testDraftValidity(false).sort()).toEqual(fullErrorLog.sort());
        expect(testDraftValidity(() => {}).sort()).toEqual(fullErrorLog.sort());
    });
});

describe("Test object function", () => {

    it("Returns true when object properties and value types match", () => {

        expect(testObject({key1: 1, key2: "a23", key3: false}, {key1: 23, key2: "adf", key3: true})).toBe(true);
    });

    it("Returns false when object properties are missing", () => {

        expect(testObject({key1: 1}, {key1: 2, key2: "ter"})).toBe(false);
    });

    it("Returns false when the sample object parameter is not an object", () => {

        expect(testObject(undefined, {key1: 1})).toBe(false);
    });
});

describe("Test array function", () => {

    it("Returns true when each object in the array matches properties and value types", () => {

        expect(testArray([{key1: 1, key2: "adf"}, {key1: 23, key2: "yer"}], {key1: 45, key2: "tef"})).toBe(true);
    });
});
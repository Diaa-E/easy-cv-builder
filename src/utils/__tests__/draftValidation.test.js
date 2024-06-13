import { describe, expect, it, vi } from "vitest";
import { 
    testDraftValidity,
    testObject,
    testArray,
    tryParseJSON,
    testLevel,
    testStringPattern,
    testAppResource
} from "../draftValidation";
import sampleInfo from "../../data/sampleInfo";

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

    function setupValidDraft()
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

    const setupFullErrorLog = () => {

        const errorLog = [];

        for (const property in sampleInfo)
        {
            errorLog.push(property);
        }

        return errorLog;
    }

    it("Returns an empty array for a valid draft", () => {

        const validDraft = setupValidDraft();

        expect(testDraftValidity(validDraft)).toEqual([]);
    });

    it("Returns an empty array for a valid draft after serialization", () => {

        const validDraft = setupValidDraft();

        expect(JSON.parse(JSON.stringify(testDraftValidity(validDraft)))).toEqual([]);
    });

    it("Returns 'accentColor' in an array for invalid accent color value", () => {

        const invalidDraft = setupValidDraft();
        invalidDraft.accentColor = "text";

        expect(testDraftValidity(invalidDraft)).toEqual(["accentColor"]);
    });

    it("Returns 'font' in an array for invalid font value", () => {

        const invalidDraft = setupValidDraft();
        invalidDraft.font = "text";

        expect(testDraftValidity(invalidDraft)).toEqual(["font"]);
    });

    it("Returns 'layout' in an array for invalid layout value", () => {

        const invalidDraft = setupValidDraft();
        invalidDraft.layout = "text";

        expect(testDraftValidity(invalidDraft)).toEqual(["layout"]);
    });

    it("Returns 'links' in an array for invalid links", () => {

        const invalidDraft = setupValidDraft();
        invalidDraft.links = undefined;

        expect(testDraftValidity(invalidDraft)).toEqual(["links"]);
    });

    it("Returns 'links' in an array for invalid links icon", () => {

        const invalidDraft = setupValidDraft();
        invalidDraft.links[0].icon = "text";

        expect(testDraftValidity(invalidDraft)).toEqual(["links"]);
    });

    it("Returns 'skills' in an array for invalid skills", () => {

        const invalidDraft = setupValidDraft();
        invalidDraft.skills = undefined;

        expect(testDraftValidity(invalidDraft)).toEqual(["skills"]);
    });

    it("Returns 'skills' in an array for skill level not divisible by 20", () => {

        const invalidDraft = setupValidDraft();
        invalidDraft.skills[0].level = 50;

        expect(testDraftValidity(invalidDraft)).toEqual(["skills"]);
    });

    it("Returns 'skills' in an array for skill level bigger than 100", () => {

        const invalidDraft = setupValidDraft();
        invalidDraft.skills[0].level = 120;

        expect(testDraftValidity(invalidDraft)).toEqual(["skills"]);
    });

    it("Returns 'skills' in an array for skill level smaller than 20", () => {

        const invalidDraft = setupValidDraft();
        invalidDraft.skills[0].level = -20;

        expect(testDraftValidity(invalidDraft)).toEqual(["skills"]);
    });

    it("Returns 'languages' in an array for invalid languages", () => {

        const invalidDraft = setupValidDraft();
        invalidDraft.languages = undefined;

        expect(testDraftValidity(invalidDraft)).toEqual(["languages"]);
    });

    it("Returns 'languages' in an array for language level not divisible by 20", () => {

        const invalidDraft = setupValidDraft();
        invalidDraft.languages[0].level = 50;

        expect(testDraftValidity(invalidDraft)).toEqual(["languages"]);
    });

    it("Returns 'languages' in an array for language level bigger than 100", () => {

        const invalidDraft = setupValidDraft();
        invalidDraft.languages[0].level = 120;

        expect(testDraftValidity(invalidDraft)).toEqual(["languages"]);
    });

    it("Returns 'languages' in an array for language level smaller than 20", () => {

        const invalidDraft = setupValidDraft();
        invalidDraft.languages[0].level = -20;

        expect(testDraftValidity(invalidDraft)).toEqual(["languages"]);
    });

    it("Returns 'education' in an array for invalid education", () => {

        const invalidDraft = setupValidDraft();
        invalidDraft.education = undefined;

        expect(testDraftValidity(invalidDraft)).toEqual(["education"]);
    });

    it("Returns 'experience' in an array for invalid experience", () => {

        const invalidDraft = setupValidDraft();
        invalidDraft.experience = undefined;

        expect(testDraftValidity(invalidDraft)).toEqual(["experience"]);
    });

    it("Returns all fields in an array if the draft is not a valid object", () => {

        //sorting removes the headache of ordering the array in a specific order
        expect(testDraftValidity(undefined).sort()).toEqual(setupFullErrorLog().sort());
        expect(testDraftValidity(null).sort()).toEqual(setupFullErrorLog().sort());
        expect(testDraftValidity("text").sort()).toEqual(setupFullErrorLog().sort());
        expect(testDraftValidity(15).sort()).toEqual(setupFullErrorLog().sort());
        expect(testDraftValidity({}).sort()).toEqual(setupFullErrorLog().sort());
        expect(testDraftValidity([]).sort()).toEqual(setupFullErrorLog().sort());
        expect(testDraftValidity(false).sort()).toEqual(setupFullErrorLog().sort());
        expect(testDraftValidity(() => {}).sort()).toEqual(setupFullErrorLog().sort());
    });
});

describe("Test level function", () => {

    it("Returns true if the level is divisible by the increment, greater than min and smaller than max", () => {

        expect(testLevel(40, 20, 100, 20)).toBe(true);
    });

    it("Returns false if the level is not divisible by the increment", () => {

        expect(testLevel(50, 20, 100, 20)).toBe(false);
    });

    it("Returns false if the level is bigger than max", () => {

        expect(testLevel(120, 20, 100, 20)).toBe(false);
    });

    it("Returns false if the level is smaller than min", () => {

        expect(testLevel(0, 20, 100, 20)).toBe(false);
    });
});

describe("Test string pattern function", () => {

    it("Returns true if string matches regex", () => {

        expect(testStringPattern("text", /text/i)).toBe(true);
    });

    it("Returns false if string does not matchs regex", () => {

        expect(testStringPattern("apple", /text/i)).toBe(false);
    });
});

describe("Test app resource function", () => {

    it("Returns true if sample resource exists in the target resource array", () => {

        expect(testAppResource( 1,
        [
            {
                value: 1
            },
            {
                value: 2
            },
            {
                value: 3
            }
        ],
        "value"
        )).toBe(true);
    });

    it("Returns false if sample resource does not exist in the target resource array", () => {

        expect(testAppResource( 4,
            [
                {
                    value: 1
                },
                {
                    value: 2
                },
                {
                    value: 3
                }
            ],
            "value"
            )).toBe(false);
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

    it("Returns false when an object in the array does not match has missing properties", () => {

        expect(testArray([{key1: 1, key2: "adf"}, {key1: 23}], {key1: 45, key2: "tef"})).toBe(false);
    });

    it("Returns false when an object in the array does not match the template type", () => {

        expect(testArray([{key1: 1, key2: "adf"}, {key1: "2", key2: "yer"}], {key1: 45, key2: "tef"})).toBe(false);
    });

    it("Returns false when a non-object item exists in the array", () => {

        expect(testArray([{key1: 1, key2: "adf"}, null], {key1: 45, key2: "tef"})).toBe(false);
    });
});

describe("Try parse JSON function", () => {

    it("Returns the parsed object if the string is valid", () => {

        expect(tryParseJSON(JSON.stringify({id: 12}))).toEqual({id: 12});
    });

    it("Returns false if the string is invalid", () => {

        expect(tryParseJSON(undefined)).toEqual(false);
    });
});
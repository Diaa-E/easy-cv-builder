import { describe, expect, it, vi } from "vitest";
import { testColor, testDraftValidity, testEducation, testExperience, testFont, testLanguages, testLayout, testLinks, testSkills } from "../draftTest";

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

describe("Draft validity", () => {

    function setup()
    {
        return {
            accentColor: "#ffffff",
            layout: "layout2",
            font: "font1",
            education: [
                {
                    id: 0,
                    degree: "",
                    school: "",
                    location: "",
                    start: "",
                    end: "",
                    hidden: false
                },
                {
                    id: 1,
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
                    id: 0,
                    company: "",
                    location: "",
                    position: "",
                    start: "",
                    end: "",
                    details: "",
                    hidden: false
                },
                {
                    id: 1,
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
                    id: 0,
                    url: "website.com",
                    icon: "icon1",
                    hidden: false,
                },
                {
                    id: 1,
                    url: "website.org",
                    icon: "icon2",
                    hidden: true,
                },
                {
                    id: 2,
                    url: "place.net",
                    icon: "icon3",
                    hidden: false,
                },
            ],
            skills: [
                {
                    id: 0,
                    name: "",
                    level: 100,
                    hidden: false,
                    showLevel: true,
                },
                {
                    id: 1,
                    name: "",
                    level: 40,
                    hidden: true,
                    showLevel: true,
                },
                {
                    id: 2,
                    name: "",
                    level: 20,
                    hidden: false,
                    showLevel: false,
                },
            ],
            languages: [
                {
                    id: 0,
                    name: "",
                    level: 100,
                    hidden: false,
                    showLevel: true,
                },
                {
                    id: 1,
                    name: "",
                    level: 40,
                    hidden: true,
                    showLevel: true,
                },
                {
                    id: 2,
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
        "font",
        "layout",
        "links",
        "skills",
        "languages",
        "education",
        "experience"
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

        expect(testDraftValidity(undefined)).toEqual(fullErrorLog);
        expect(testDraftValidity(null)).toEqual(fullErrorLog);
        expect(testDraftValidity("text")).toEqual(fullErrorLog);
        expect(testDraftValidity(15)).toEqual(fullErrorLog);
        expect(testDraftValidity({})).toEqual(fullErrorLog);
        expect(testDraftValidity([])).toEqual(fullErrorLog);
        expect(testDraftValidity(false)).toEqual(fullErrorLog);
        expect(testDraftValidity(() => {})).toEqual(fullErrorLog);
    });
});

describe("Experience section validity", () => {

    function setup()
    {
        return [
            {
                id: 0,
                company: "",
                location: "",
                position: "",
                start: "",
                end: "",
                details: "",
                hidden: false
            },
            {
                id: 1,
                company: "",
                location: "",
                position: "",
                start: "",
                end: "",
                details: "",
                hidden: false
            },
        ];
    }

    it("Returns true for valid experience", () => {

        const validExperience = setup();

        expect(testExperience(validExperience)).toBe(true);
    });

    it("Returns true for valid experience after serialization", () => {

        const validExperience = setup();

        expect(JSON.parse(JSON.stringify(testExperience(validExperience)))).toBe(true);
    });

    it("Returns false for repetetive IDs", () => {

        const invalidExperience = setup();
        invalidExperience[0].id = invalidExperience[invalidExperience.length - 1].id;

        expect(testExperience(invalidExperience)).toBe(false);
    });

    it("Returns false for non boolean hidden values", () => {

        const invalidExperience = setup();
        invalidExperience[0].hidden = "text";

        expect(testExperience(invalidExperience)).toBe(false);
    });

    it("Returns false for non array experience", () => {

        expect(testExperience("text")).toBe(false);
    });
});

describe("Education section validity", () => {

    function setup()
    {
        return [
            {
                id: 0,
                degree: "",
                school: "",
                location: "",
                start: "",
                end: "",
                hidden: false
            },
            {
                id: 1,
                degree: "",
                school: "",
                location: "",
                start: "",
                end: "",
                hidden: true
            },
        ];
    }

    it("Returns true for valid education", () => {

        const validEducation = setup();

        expect(testEducation(validEducation)).toBe(true);
    });

    it("Returns true for valid education after serialization", () => {

        const validEducation = setup();

        expect(JSON.parse(JSON.stringify(testEducation(validEducation)))).toBe(true);
    });

    it("Returns false for repetitive IDs", () => {

        const invalidEducation = setup();
        invalidEducation[0].id = invalidEducation[invalidEducation.length - 1].id;

        expect(testEducation(invalidEducation)).toBe(false);
    });

    it("Returns false for non boolean hidden values", () => {

        const invalidEducation = setup();
        invalidEducation[0].hidden = "text";

        expect(testEducation(invalidEducation)).toBe(false);
    });

    it("Returns false for non array education", () => {

        expect(testEducation("text")).toBe(false);
    });
});

describe("Languages section validity", () => {

    function setup()
    {
        return [
            {
                id: 0,
                name: "English",
                level: 100,
                hidden: false,
                showLevel: true,
            },
            {
                id: 1,
                name: "Spanish",
                level: 20,
                hidden: true,
                showLevel: true,
            },
            {
                id: 2,
                name: "Arabic",
                level: 100,
                hidden: false,
                showLevel: false,
            },
            {
                id: 3,
                name: "German",
                level: 40,
                hidden: false,
                showLevel: true,
            },
        ];
    }

    it("Returns true for valid languages", () => {

        const validLanguages = setup();

        expect(testLanguages(validLanguages)).toBe(true);
    });

    it("Returns true for valid languages after serialization", () => {

        const validLanguages = setup();

        expect(JSON.parse(JSON.stringify(testLanguages(validLanguages)))).toBe(true);
    });

    it("Returns false for repetitive IDs", () => {

        const invalidLanguages = setup();
        invalidLanguages[0].id = invalidLanguages[invalidLanguages.length - 1].id;

        expect(testLanguages(invalidLanguages)).toBe(false);
    });

    it("Returns false for non number level values", () => {

        const invalidLanguages = setup();
        invalidLanguages[0].level = "text";

        expect(testLanguages(invalidLanguages)).toBe(false);
    });

    it("Returns false for level less than 0", () => {

        const invalidLanguages = setup();
        invalidLanguages[0].level = -20;

        expect(testLanguages(invalidLanguages)).toBe(false);
    });

    it("Returns false for level more than 100", () => {

        const invalidLanguages = setup();
        invalidLanguages[0].level = 120;

        expect(testLanguages(invalidLanguages)).toBe(false);
    });

    it("Returns false for level not divisible by 20", () => {

        const invalidLanguages = setup();
        invalidLanguages[0].level = 30;

        expect(testLanguages(invalidLanguages)).toBe(false);
    });

    it("Returns false for non boolean hidden values", () => {

        const invalidLanguages = setup();
        invalidLanguages[0].hidden = "text";

        expect(testLanguages(invalidLanguages)).toBe(false);
    });

    it("Returns false for non boolean showLevel values", () => {

        const invalidLanguages = setup();
        invalidLanguages[0].showLevel = "text";

        expect(testLanguages(invalidLanguages)).toBe(false);
    });

    it("Returns false for non array languages", () => {

        expect(testLanguages("text")).toBe(false);
    });
});

describe("Skills section validity", () => {

    function setup()
    {
        return [
            {
                id: 0,
                name: "HTML",
                level: 100,
                hidden: false,
                showLevel: true,
            },
            {
                id: 1,
                name: "PHP",
                level: 20,
                hidden: true,
                showLevel: false,
            },
            {
                id: 2,
                name: "Java",
                level: 40,
                hidden: false,
                showLevel: false,
            },
            {
                id: 3,
                name: "Perl",
                level: 80,
                hidden: false,
                showLevel: true,
            },
        ];
    }

    it("Returns true for valid skills", () => {

        const validSkills = setup();

        expect(testSkills(validSkills)).toBe(true);
    });

    it("Returns true for valid skills after serialization", () => {

        const validSkills = setup();

        expect(JSON.parse(JSON.stringify(testSkills(validSkills)))).toBe(true);
    });

    it("Returns false for repetitive IDs", () => {

        const invalidSkills = setup();
        invalidSkills[0].id = invalidSkills[invalidSkills.length - 1].id;

        expect(testSkills(invalidSkills)).toBe(false);
    });

    it("Returns false for non number level values", () => {

        const invalidSkills = setup();
        invalidSkills[0].level= "text";

        expect(testSkills(invalidSkills)).toBe(false);
    });

    it("Returns false for level less than 0", () => {

        const invalidSkills = setup();
        invalidSkills[0].level= -20;

        expect(testSkills(invalidSkills)).toBe(false);
    });

    it("Returns false for level more than 100", () => {

        const invalidSkills = setup();
        invalidSkills[0].level= 120;

        expect(testSkills(invalidSkills)).toBe(false);
    });

    it("Returns false for level not divisible by 20", () => {

        const invalidSkills = setup();
        invalidSkills[0].level= 30;

        expect(testSkills(invalidSkills)).toBe(false);
    });

    it("Returns false for non boolean hidden value", () => {

        const invalidSkills = setup();
        invalidSkills[0].hidden= "text";

        expect(testSkills(invalidSkills)).toBe(false);
    });

    it("Returns false for non boolean showLevel value", () => {

        const invalidSkills = setup();
        invalidSkills[0].showLevel= "text";

        expect(testSkills(invalidSkills)).toBe(false);
    });

    it("Returns false for non array skills", () => {

        expect(testSkills("text")).toBe(false);
    });
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

    it("Returns false for non array links", () => {

        expect(testLinks("text")).toBe(false);
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
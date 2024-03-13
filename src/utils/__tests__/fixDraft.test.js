import { describe, expect, it } from "vitest";
import { fixDraft } from "../fixDraft";

describe("Fix draft function", () => {

    it("Replaces invalid string key by corresponding key from default template object", () => {

        expect(fixDraft({invalidKey: "invalid"}, ["invalidKey"], {invalidKey: "valid"})).toEqual({invalidKey: "valid"});
    });

    it("Replaces invalid array of objects key by corresponding key from default template object", () => {

        const invalidObject = {
            invalidKey: [
                {
                    value1: "value1",
                    value2: "value2",
                } 
            ]
        }

        const templateObject = {
            invalidKey: [
                {
                    value1: "valid1",
                    value2: "value2"
                }
            ]
        }

        expect(fixDraft(invalidObject, ["invalidKey"], templateObject)).toEqual(templateObject);
    });

    it("Replaces only target keys", () => {

        expect(fixDraft({invalid1: "invalid", invalid2: "invalid"}, ["invalid1"], {invalid1: "valid", invalid2: "valid"})).toEqual({
            invalid1: "valid",
            invalid2: "invalid"
        })
    });
});
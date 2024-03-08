import { describe, expect, it } from "vitest";
import { toggleHideSection } from "../toggleHideSection";

describe("Toggle hide all items function" , () => {

    function setup()
    {
        return [
            {
                value: "item1",
                hidden: false,
            },
            {
                value: "item2",
                hidden: true,
            },
            {
                value: "item3",
                hidden: true,
            },
            {
                value: "item4",
                hidden: false,
            },
        ]
    }

    it("Hides all items when passed true", () => {

        expect(toggleHideSection(setup(), true)).toEqual([
            {
                value: "item1",
                hidden: true,
            },
            {
                value: "item2",
                hidden: true,
            },
            {
                value: "item3",
                hidden: true,
            },
            {
                value: "item4",
                hidden: true,
            },
        ]);
    });

    it("Shows all items when passed false", () => {

        expect(toggleHideSection(setup(), false)).toEqual([
            {
                value: "item1",
                hidden: false,
            },
            {
                value: "item2",
                hidden: false,
            },
            {
                value: "item3",
                hidden: false,
            },
            {
                value: "item4",
                hidden: false,
            },
        ]);
    });

    it("Returns an empty array when passed an empty array regradless of hide flag", () => {

        expect(toggleHideSection([])).toEqual([]);
    });
});
import { describe, expect, it } from "vitest";
import { deleteItem, moveItemUp, toggleHide, updateItems } from "../arrayFunctions";

describe("Toggle hide function", () => {

    function setup() {
        return [
            {
                id: "1",
                hidden: true
            },
            {
                id: "2",
                hidden: false
            },
        ];
    }

    it("Hides a visible item", () => {

        expect(toggleHide("2", setup())).toEqual([{ id: "1", hidden: true }, { id: "2", hidden: true }]);
    });

    it("Shows a hidden item", () => {

        expect(toggleHide("1", setup())).toEqual([{ id: "1", hidden: false }, { id: "2", hidden: false }]);
    });
});

describe("Update items function", () => {

    function setup() {
        return [
            {
                id: "1",
                value: "text1"
            },
            {
                id: "2",
                value: "text2"
            }
        ];
    }

    it("Updates existing item if passed ID matches an existing item", () => {

        expect(updateItems({ id: "2", value: "newText" }, setup())).toEqual([{ id: "1", value: "text1" }, { id: "2", value: "newText" }]);
    });

    it("Adds a new item at the end if the passed ID does not match an existing item", () => {

        expect(updateItems({ id: "3", value: "text3" }, setup())).toEqual([{ id: "1", value: "text1" }, { id: "2", value: "text2" }, { id: "3", value: "text3" }]);
    });
});

describe("Delete item function", () => {

    function setup() {
        return [
            {
                id: "1",
                value: "text1"
            },
            {
                id: "2",
                value: "text2"
            }
        ];
    }

    it("Deletes the item with a matching ID to the passed argument", () => {

        expect(deleteItem("1", setup())).toEqual([{ id: "2", value: "text2" }]);
    });
});

describe("Move item up function", () => {

    function setup() {
        return [
            {
                id: "1",
                value: "text1"
            },
            {
                id: "2",
                value: "text2"
            },
            {
                id: "3",
                value: "text3"
            },
        ];
    }

    it("Moves a mid-array item up", () => {

        expect(moveItemUp("2", setup())).toEqual([{ id: "2", value: "text2" }, { id: "1", value: "text1" }, { id: "3", value: "text3" }]);
    });

    it("Moves last item in array up", () => {

        expect(moveItemUp("3", setup())).toEqual([{ id: "1", value: "text1" }, { id: "3", value: "text3" }, { id: "2", value: "text2" }]);
    });

    it("Does nothing when passed ID matches first item in array", () => {

        expect(moveItemUp("1", setup())).toEqual(setup());
    });
});
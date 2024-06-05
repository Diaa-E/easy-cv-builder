import { describe, expect, it } from "vitest";
import { deepCopy, getItemIndex, isBright } from "../utility";

describe("Brightness sensor", () => {

    it("Returns true for white", () => {

        expect(isBright("#ffffff")).toBe(true);
    });

    it("Returns false for black", () => {

        expect(isBright("#000000")).toBe(false);
    });
});

describe("Deep copy", () => {

    it("Returns a new object with the same key-value pairs", () => {

        const sampleObject = {
            key1: "value1",
            key2: "value2"
        };

        expect(deepCopy(sampleObject)).not.toBe(sampleObject);
        expect(deepCopy(sampleObject)).toEqual(sampleObject);
    });

    it("Copies deeply nested objects", () => {

        const sampleObject = {
            level1: {
                level2: {
                    level3: {
                        key1: "value1",
                        key2: "value2"
                    }
                }
            }
        };

        expect(deepCopy(sampleObject)).not.toBe(sampleObject);
        expect(deepCopy(sampleObject)).toEqual(sampleObject);
    });

    it("Returns a new array with the same items", () => {

        const sampleArray = [
            "item1",
            "item2"
        ];

        expect(deepCopy(sampleArray)).not.toBe(sampleArray);
        expect(deepCopy(sampleArray)).toEqual(sampleArray);
    });
});

describe("Get item index", () => {

    it("Returns index of item with matching id", () => {

        const itemArray = [
            {
                id: 1
            },
            {
                id: 2
            }
        ];

        expect(getItemIndex(itemArray, 2)).toBe(1);
    });

    it("Returns -1 when no item matches the passed id", () => {

        const itemArray = [
            {
                id: 1
            },
            {
                id: 2
            }
        ];

        expect(getItemIndex(itemArray, 3)).toBe(-1);
    });

    it("Handles mismatching id types (string/number)", () => {

        const itemArray = [
            {
                id: 1
            },
            {
                id: 2
            }
        ];

        expect(getItemIndex(itemArray, "2")).toBe(1);
    });
});
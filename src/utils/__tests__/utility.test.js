import { describe, expect, it } from "vitest";
import { isBright } from "../utility";

describe("Brightness sensor", () => {

    it("Returns true for white", () => {

        expect(isBright("#ffffff")).toBe(true);
    });

    it("Returns false for black", () => {

        expect(isBright("#000000")).toBe(false);
    });
});
import { describe, expect, it } from "vitest";
import { calculateTextLevel } from "../calculateTextLevel";

describe("Calculate text level function", () => {

    function orderedPattern()
    {
        return [
            {
                name: "max",
                min: 100,
            },
            {
                name: "mid",
                min: 50,
            },
            {
                name: "min",
                min: 0
            }
        ];
    }

    function shuffledPattern()
    {
        return [
            {
                name: "mid",
                min: 50,
            },
            {
                name: "min",
                min: 0
            },
            {
                name: "max",
                min: 100,
            },
        ];
    }

    it("(Ordered pattern) Returns max for 100", () => {

        expect(calculateTextLevel(orderedPattern(), 100)).toBe("max");
    });

    it("(Ordered pattern) Returns mid for 50 <= values < 100", () => {

        expect(calculateTextLevel(orderedPattern(), 50)).toBe("mid");        
        expect(calculateTextLevel(orderedPattern(), 75)).toBe("mid");    
        expect(calculateTextLevel(orderedPattern(), 99)).toBe("mid");
    });

    it("(Ordered pattern) Returns min for 0 <= values < 50", () => {

        expect(calculateTextLevel(orderedPattern(), 0)).toBe("min");
        expect(calculateTextLevel(orderedPattern(), 25)).toBe("min");
        expect(calculateTextLevel(orderedPattern(), 49)).toBe("min");
    });

    it("(Ordered pattern) Handles string value for all cases", () => {

        expect(calculateTextLevel(orderedPattern(), "0")).toBe("min");
        expect(calculateTextLevel(orderedPattern(), "50")).toBe("mid");
        expect(calculateTextLevel(orderedPattern(), "100")).toBe("max");
    });

    it("(Shuffled pattern) Returns max for 100", () => {

        expect(calculateTextLevel(shuffledPattern(), 100)).toBe("max");
    });

    it("(Shuffled pattern) Returns mid for 50 <= values < 100", () => {

        expect(calculateTextLevel(shuffledPattern(), 50)).toBe("mid");        
        expect(calculateTextLevel(shuffledPattern(), 75)).toBe("mid");    
        expect(calculateTextLevel(shuffledPattern(), 99)).toBe("mid");
    });

    it("(Shuffled pattern) Returns min for 0 <= values < 50", () => {

        expect(calculateTextLevel(shuffledPattern(), 0)).toBe("min");
        expect(calculateTextLevel(shuffledPattern(), 25)).toBe("min");
        expect(calculateTextLevel(shuffledPattern(), 49)).toBe("min");
    });

    it("Throws an error when value is lower than the lower bound of the templates", () => {

        expect(() => calculateTextLevel(orderedPattern(), -20)).toThrowError(/lower\sbound/i);
    });

    it("Throws an error when the value cannot be converted into a number", () => {

        expect(() => calculateTextLevel(orderedPattern(), "hello")).toThrowError(/nan/i);
    });
});
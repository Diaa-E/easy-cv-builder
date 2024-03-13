import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import LevelText from "../LevelText";

describe("Level text component", () => {

    it("Uses 3rd array item as text when level = 100", () => {

        render(<LevelText itemData={{level: 100}} textLevels={[{name: "2", min: 100}, {name: "1", min: 50}, {name: "0", min: 0}]}/>);

        expect(screen.getByText("2")).toBeInTheDocument();
    });

    it("Uses 2nd array item as text when 100 > level > 50", () => {

        render(<LevelText itemData={{level: 60}} textLevels={[{name: "2", min: 100}, {name: "1", min: 50}, {name: "0", min: 0}]}/>);

        expect(screen.getByText("1")).toBeInTheDocument();
    });

    it("Uses 1st array item as text when 0 < level < 50", () => {

        render(<LevelText itemData={{level: 20}} textLevels={[{name: "2", min: 100}, {name: "1", min: 50}, {name: "0", min: 0}]}/>);

        expect(screen.getByText("0")).toBeInTheDocument();
    });
});
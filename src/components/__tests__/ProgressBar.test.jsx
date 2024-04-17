import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ProgressBar from "../ProgressBar";

describe("ProgressBar component", () => {

    it("Renders a progress bar labeled as level", () => {

        render(<ProgressBar />);

        expect(screen.queryByRole("progressbar", {name: /level/i})).toBeInTheDocument();
    });

    it("Sets prograss bar value to level prop", () => {

        render(<ProgressBar level={40} />);

        expect(screen.queryByRole("progressbar", {name: /level/i}).ariaValueNow).toContain("40");
    });

    it("Adds disabled class when disabled prop is true", () => {

        render(<ProgressBar disabled={true} />);

        expect(screen.queryByRole("progressbar", {name: /level/i})).toHaveClass("disabled");
    });
});
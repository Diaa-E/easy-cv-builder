import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import About from "../About";

describe("About component", () => {

    it("Renders in DOM", () => {

        render(<About/>);

        expect(screen.getByRole("region")).toBeInTheDocument();
    });

    it("Renders a title with the app's name followed by v (for version)", () => {

        render(<About/>);

        expect(screen.getByRole("heading").textContent).toBe("Easy CV Builder v");
    });

    it("Shows version number from props", () => {

        render(<About version={"1.0.0"} />);

        expect(screen.getByRole("heading").textContent).toBe("Easy CV Builder v1.0.0");
    });
});
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ListItemText from "../ListItemText";

describe("List Item Text component", () => {

    vi.mock("../ItemControls.jsx", () => {

        return {
            default: () => <></>
        }
    });

    it("Renders a list item labeled by title prop", () => {

        render(<ListItemText title={"title"} />);

        expect(screen.queryByRole("listitem", {name: /title/i})).toBeInTheDocument();
    });

    it("Displays text of each line on hover for when text is overflowing", () => {

        render(<ListItemText firstLine={"line1"} secondLine={"line2"} />);

        expect(screen.queryByText(/line1/i).title).toContain("line1");
        expect(screen.queryByText(/line2/i).title).toContain("line2");
    });

    it("Labels item as hidden", () => {

        render(<ListItemText hidden={true} title={"title"} />);

        expect(screen.queryByRole("listitem", {name: /title/i}).ariaLabel).toContain("hidden");
    });

    it("Labels item as visible", () => {

        render(<ListItemText hidden={false} title={"title"} />);

        expect(screen.queryByRole("listitem", {name: /title/i}).ariaLabel).toContain("visible");
    });

    it("Displays text from props", () => {

        render(<ListItemText firstLine={"line1"} secondLine={"line2"} />);

        expect(screen.queryByText(/line1/i)).toBeInTheDocument();
        expect(screen.queryByText(/line2/i)).toBeInTheDocument();
    });

    it("Renders a delete button", () => {

        render(<ListItemText />);

        expect(screen.queryByRole("button", {name: /delete/i})).toBeInTheDocument();
    });
});
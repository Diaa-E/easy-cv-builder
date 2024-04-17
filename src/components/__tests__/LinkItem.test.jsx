import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import LinkItem from "../LinkItem";

describe("Link Item component", () => {

    vi.mock("../ItemControls.jsx", () => {
        return {
            default: () => <></>
        }
    });

    it("Renders a list item labeled with website name", () => {

        render(<LinkItem website={"test"}/>);

        expect(screen.queryByRole("listitem", {name: /test/i})).toBeInTheDocument();
    });

    it("Labels list item as hidden", () => {

        render(<LinkItem website={"test"} hidden={true} />);

        expect(screen.getByRole("listitem", {name: /test/i})).toBeInTheDocument();
        expect(screen.getByRole("listitem", {name: /test/i}).ariaLabel).toContain("hidden");
    });

    it("Labels list item as visible", () => {

        render(<LinkItem website={"test"} hidden={false} />);

        expect(screen.getByRole("listitem", {name: /test/i})).toBeInTheDocument();
        expect(screen.getByRole("listitem", {name: /test/i}).ariaLabel).toContain("visible");
    });

    it("Renders a delete button", () => {

        render(<LinkItem/>);

        expect(screen.getByRole("button", {name: /delete/i})).toBeInTheDocument();
    });

    it("Calls deleteItem function when delete button is clicked", () => {

        const deleteItem = vi.fn();
        render(<LinkItem deleteItem={deleteItem} />);
        const deleteButton = screen.queryByRole("button", { name: /delete/i});
        fireEvent.click(deleteButton);

        expect(deleteItem).toHaveBeenCalledOnce();
    });

    it("Calls deleteItem function with id prop when delete button is clicked", () => {

        const deleteItem = vi.fn();
        render(<LinkItem id={"testid"} deleteItem={deleteItem} />);
        const deleteButton = screen.queryByRole("button", { name: /delete/i});
        fireEvent.click(deleteButton);

        expect(deleteItem).toHaveBeenCalledWith("testid");
    });

    it("Renders text from props", () => {

        render(<LinkItem text={"test"}/>);

        expect(screen.queryByText(/test/i)).toBeInTheDocument();
    });
});
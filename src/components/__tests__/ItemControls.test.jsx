import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ItemControls from "../ItemControls";

describe("Item controls component", () => {

    function setup(jsx, screenWidth)
    {
        window.innerWidth = screenWidth;
        return render(jsx);
    }

    it("Renders a mobile menu button when screen width is less than 700 pixels", () => {

        setup(<ItemControls />, 500);

        expect(screen.queryByRole("button", {name: /options/i})).toBeInTheDocument();
    });

    it("Renders item control buttons when screen width is more than 700 pixels", () => {

        setup(<ItemControls />, 1000);

        expect(screen.queryByRole("button", {name: /options/i})).not.toBeInTheDocument();
        expect(screen.queryByRole("button", {name: /move.*?up/i})).toBeInTheDocument();
        expect(screen.queryByRole("button", {name: /edit/i})).toBeInTheDocument();
        expect(screen.queryByRole("button", {name: /hide|show/i})).toBeInTheDocument();
    });

    it("Calls moveItemUp function when move up button is clicked", () => {

        const moveItemUp = vi.fn();
        setup(<ItemControls moveItemUp={moveItemUp }/>, 1000);
        const moveUpButton = screen.queryByRole("button", {name: /move.*?up/i});
        fireEvent.click(moveUpButton);

        expect(moveItemUp).toHaveBeenCalledOnce();
    });

    it("Calls toggleEdit function when edit button is clicked", () => {

        const toggleEdit = vi.fn();
        setup(<ItemControls toggleEdit={toggleEdit }/>, 1000);
        const editButton = screen.queryByRole("button", {name: /edit/i});
        fireEvent.click(editButton);

        expect(toggleEdit).toHaveBeenCalledOnce();
    });

    it("Calls toggleHide function when show/hide button is clicked", () => {

        const toggleHide = vi.fn();
        setup(<ItemControls toggleHide={toggleHide }/>, 1000);
        const toggleHideButton = screen.queryByRole("button", {name: /hide|show/i});
        fireEvent.click(toggleHideButton);

        expect(toggleHide).toHaveBeenCalledOnce();
    });

    it("Toggle hide button reads 'hide' text when item is visible", () => {

        setup(<ItemControls hidden={false} />, 1000);

        expect(screen.queryByRole("button", {name: /hide/i})).toBeInTheDocument();
    });

    it("Toggle hide button reads 'show' text when item is hidden", () => {

        setup(<ItemControls hidden={true} />, 1000);

        expect(screen.queryByRole("button", {name: /show/i})).toBeInTheDocument();
    });
});
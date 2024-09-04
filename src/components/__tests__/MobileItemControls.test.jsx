import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import MobileItemControls from "../MobileItemControls";

describe("Mobile Item Controls component", () => {

    function setup(jsx)
    {
        return render(jsx);
    }

    function openMenu()
    {
        const button = screen.queryByRole("button", {name: /options/i});
        fireEvent.click(button);
    }


    it("Renders a menu button", () => {

        setup(<MobileItemControls />);

        expect(screen.queryByRole("button", {name: /options/i})).toBeInTheDocument();
    });

    it("Renders menu closed by default", () => {

        setup(<MobileItemControls />);

        expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });

    it("Opens menu when button is clicked", () => {

        setup(<MobileItemControls />);
        openMenu();

        expect(screen.queryByRole("menu", {name: /menu/i})).toBeInTheDocument();
    });

    it("Does not close menu when overlay children are clicked", () => {

        setup(<MobileItemControls />);
        openMenu();

        expect(screen.queryByRole("menu")).toBeInTheDocument();

        fireEvent.click(screen.queryByRole("menu"));

        expect(screen.queryByRole("menu")).toBeInTheDocument();
    });

    it("Closes menu when overlay is clicked", () => {

        const {container} = setup(<MobileItemControls />);
        openMenu();
        const overlay = container.querySelector("#item-menu-overlay");

        expect(screen.queryByRole("menu")).toBeInTheDocument();

        fireEvent.click(overlay);

        expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });

    it("Calls moveItemUp function once when move up menu option is clicked", () => {

        const moveItemUp = vi.fn();
        setup(<MobileItemControls moveItemUp={moveItemUp} />);
        openMenu();
        const  moveUpButton = screen.queryByRole("button", {name: /move\sup/i});
        fireEvent.click(moveUpButton);

        expect(moveItemUp).toHaveBeenCalledOnce();
    });

    it("Calls toggleEdit function once when edit menu option is clicked", () => {

        const toggleEdit = vi.fn();
        setup(<MobileItemControls toggleEdit={toggleEdit} />);
        openMenu();
        const  editButton = screen.queryByRole("button", {name: /edit/i});
        fireEvent.click(editButton);

        expect(toggleEdit).toHaveBeenCalledOnce();
    });

    it("Calls toggleHide function once when toggle hide menu option is clicked", () => {

        const toggleHide = vi.fn();
        setup(<MobileItemControls toggleHide={toggleHide} />);
        openMenu();
        const  toggleHideButton = screen.queryByRole("button", {name: /hide|show/i});
        fireEvent.click(toggleHideButton);

        expect(toggleHide).toHaveBeenCalledOnce();
    });

    it("Toggle hide button has 'hide' text when item is visible", () => {

        setup(<MobileItemControls hidden={false} />);
        openMenu();

        expect(screen.queryByRole("button", {name: /hide/i})).toBeInTheDocument();
    });

    it("Toggle hide button has 'show' text when item is hidden", () => {

        setup(<MobileItemControls hidden={true} />);
        openMenu();

        expect(screen.queryByRole("button", {name: /show/i})).toBeInTheDocument();
    });

    it("Renders a close menu button", () => {

        setup(<MobileItemControls />);
        openMenu();

        expect(screen.queryByRole("button", {name: /close/i})).toBeInTheDocument();
    });

    it("Closes menu when close menu button is clicked", () => {

        setup(<MobileItemControls />);
        openMenu();
        const closeButton = screen.queryByRole("button", {name: /close/i});

        expect(screen.queryByRole("menu")).toBeInTheDocument();

        fireEvent.click(closeButton);

        expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });
});
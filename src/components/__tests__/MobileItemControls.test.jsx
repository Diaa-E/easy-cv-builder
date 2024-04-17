import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import MobileItemControls from "../MobileItemControls";
import { ScreenWidthContext } from "../../App";

describe("Mobile Item Controls component", () => {

    function setup(jsx, {providerProps})
    {
        return render(
            <ScreenWidthContext.Provider {...providerProps}>{jsx}</ScreenWidthContext.Provider>
        );
    }

    function openMenu()
    {
        const button = screen.queryByRole("button", {name: /options/i});
        fireEvent.click(button);
    }

    const providerProps = {
        value: {screenWidth: 500}
    };

    it("Renders a menu button", () => {

        setup(<MobileItemControls />, {providerProps});

        expect(screen.queryByRole("button", {name: /options/i})).toBeInTheDocument();
    });

    it("Renders menu closed by default", () => {

        setup(<MobileItemControls />, {providerProps});

        expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });

    it("Opens menu when button is clicked", () => {

        setup(<MobileItemControls />, {providerProps});
        openMenu();

        expect(screen.queryByRole("menu", {name: /menu/i})).toBeInTheDocument();
    });

    it("Does not close menu when overlay children are clicked", () => {

        setup(<MobileItemControls />, {providerProps});
        openMenu();

        expect(screen.queryByRole("menu")).toBeInTheDocument();

        fireEvent.click(screen.queryByRole("menu"));

        expect(screen.queryByRole("menu")).toBeInTheDocument();
    });

    it("Closes menu when overlay is clicked", () => {

        const {container} = setup(<MobileItemControls />, {providerProps});
        openMenu();
        const overlay = container.querySelector("#item-menu-overlay");

        expect(screen.queryByRole("menu")).toBeInTheDocument();

        fireEvent.click(overlay);

        expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });

    it("Calls moveItemUp function once when move up menu option is clicked", () => {

        const moveItemUp = vi.fn();
        setup(<MobileItemControls moveItemUp={moveItemUp} />, {providerProps});
        openMenu();
        const  moveUpButton = screen.queryByRole("button", {name: /move\sup/i});
        fireEvent.click(moveUpButton);

        expect(moveItemUp).toHaveBeenCalledOnce();
    });

    it("Calls toggleEdit function once when edit menu option is clicked", () => {

        const toggleEdit = vi.fn();
        setup(<MobileItemControls toggleEdit={toggleEdit} />, {providerProps});
        openMenu();
        const  editButton = screen.queryByRole("button", {name: /edit/i});
        fireEvent.click(editButton);

        expect(toggleEdit).toHaveBeenCalledOnce();
    });

    it("Calls toggleHide function once when toggle hide menu option is clicked", () => {

        const toggleHide = vi.fn();
        setup(<MobileItemControls toggleHide={toggleHide} />, {providerProps});
        openMenu();
        const  toggleHideButton = screen.queryByRole("button", {name: /hide|show/i});
        fireEvent.click(toggleHideButton);

        expect(toggleHide).toHaveBeenCalledOnce();
    });

    it("Toggle hide button has 'hide' text when item is visible", () => {

        setup(<MobileItemControls hidden={false} />, {providerProps});
        openMenu();

        expect(screen.queryByRole("button", {name: /hide/i})).toBeInTheDocument();
    });

    it("Toggle hide button has 'show' text when item is hidden", () => {

        setup(<MobileItemControls hidden={true} />, {providerProps});
        openMenu();

        expect(screen.queryByRole("button", {name: /show/i})).toBeInTheDocument();
    });
});
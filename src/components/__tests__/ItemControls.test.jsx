import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ScreenWidthContext } from "../../App";
import ItemControls from "../ItemControls";

describe("Item controls component", () => {

    function setup(jsx, {providerProps})
    {
        return render(
            <ScreenWidthContext.Provider {...providerProps}>{jsx}</ScreenWidthContext.Provider>
        );
    }

    it("Renders a mobile menu button when screen width is less than 700 pixels", () => {

        const providerProps = {
            value: {screenWidth: 500}
        };
        setup(<ItemControls />, {providerProps});

        expect(screen.queryByRole("button", {name: /options/i})).toBeInTheDocument();
    });

    it("Renders item control buttons when screen width is more than 700 pixels", () => {

        const providerProps = {
            value: {screenWidth: 1000}
        };
        setup(<ItemControls />, {providerProps});

        expect(screen.queryByRole("button", {name: /options/i})).not.toBeInTheDocument();
        expect(screen.queryByRole("button", {name: /move\sup/i})).toBeInTheDocument();
        expect(screen.queryByRole("button", {name: /edit/i})).toBeInTheDocument();
        expect(screen.queryByRole("button", {name: /hide|show/i})).toBeInTheDocument();
    });

    it("Calls moveItemUp function when move up button is clicked", () => {

        const moveItemUp = vi.fn();
        const providerProps = {
            value: {screenWidth: 1000}
        };
        setup(<ItemControls moveItemUp={moveItemUp }/>, {providerProps});
        const moveUpButton = screen.queryByRole("button", {name: /move\sup/i});
        fireEvent.click(moveUpButton);

        expect(moveItemUp).toHaveBeenCalledOnce();
    });

    it("Calls toggleEdit function when edit button is clicked", () => {

        const toggleEdit = vi.fn();
        const providerProps = {
            value: {screenWidth: 1000}
        };
        setup(<ItemControls toggleEdit={toggleEdit }/>, {providerProps});
        const editButton = screen.queryByRole("button", {name: /edit/i});
        fireEvent.click(editButton);

        expect(toggleEdit).toHaveBeenCalledOnce();
    });

    it("Calls toggleHide function when show/hide button is clicked", () => {

        const toggleHide = vi.fn();
        const providerProps = {
            value: {screenWidth: 1000}
        };
        setup(<ItemControls toggleHide={toggleHide }/>, {providerProps});
        const toggleHideButton = screen.queryByRole("button", {name: /hide|show/i});
        fireEvent.click(toggleHideButton);

        expect(toggleHide).toHaveBeenCalledOnce();
    });

    it("Toggle hide button reads 'hide' text when item is visible", () => {

        const providerProps = {
            value: {screenWidth: 1000}
        };
        setup(<ItemControls hidden={false} />, {providerProps});

        expect(screen.queryByRole("button", {name: /hide/i})).toBeInTheDocument();
    });

    it("Toggle hide button reads 'show' text when item is hidden", () => {

        const providerProps = {
            value: {screenWidth: 1000}
        };
        setup(<ItemControls hidden={true} />, {providerProps});

        expect(screen.queryByRole("button", {name: /show/i})).toBeInTheDocument();
    });
});
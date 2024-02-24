import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import DarkModeButton from "../components/DarkModeButton";
import userEvent from "@testing-library/user-event";

describe("DarkModeButton component", () => {

    it("Renders in the DOM", () => {

        render(<DarkModeButton/>);

        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("Renders an image inside the button", () => {

        render(<DarkModeButton />);

        expect(screen.getByRole("button").childNodes.length).toBe(1);
        expect(screen.getByRole("button").childNodes[0]).toBeInstanceOf(Image);
    });

    it("Assigns yellow class to the button icon when dark mode is on", () => {

        render(<DarkModeButton darkMode={true} />);

        expect(screen.getByRole("img")).toHaveClass("yellow");
    });

    it("Assigns blue class to the button icon when dark mode is off", () => {

        render(<DarkModeButton darkMode={false} />);

        expect(screen.getByRole("img")).toHaveClass("blue");
    });

    it("Calls onClick function when clicked", async () => {

        const onClick = vi.fn();
        const user = userEvent.setup();
        render(<DarkModeButton onClick={onClick}/>);
        const button = screen.getByRole("button");
        await user.click(button);

        expect(onClick).toHaveBeenCalledOnce();
    });

    it("Does not call onClick function when not clicked", () => {

        const onClick = vi.fn();
        render(<DarkModeButton onClick={onClick}/>);

        expect(onClick).not.toHaveBeenCalled();
    });
});
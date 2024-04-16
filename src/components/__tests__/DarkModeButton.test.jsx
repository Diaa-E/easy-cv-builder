import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import DarkModeButton from "../DarkModeButton";

describe("DarkModeButton component", () => {

    it("Prompts user to use light theme when dark theme is active", () => {

        render(<DarkModeButton darkMode={true} onClick={() => {}}/>);

        expect(screen.getByRole("button", {name: /light/i})).toBeInTheDocument();
    });

    it("Prompts user to use dark theme when light theme is active", () => {

        render(<DarkModeButton darkMode={false} onClick={() => {}}/>);

        expect(screen.getByRole("button", {name: /dark/i})).toBeInTheDocument();
    });

    it("Calls onClick function when button is clicked", async () => {

        const onClick = vi.fn();
        render(<DarkModeButton onClick={onClick}/>);
        const button = screen.getByRole("button", {name: /theme/i});
        fireEvent.click(button);

        expect(onClick).toHaveBeenCalledOnce();
    });

    it("Calls onClick function when button icon is clicked", () => {

        const onClick = vi.fn();
        render(<DarkModeButton onClick={onClick}/>);
        const icon = screen.getAllByRole("img", {hidden: true});
        fireEvent.click(icon[0]);

        expect(onClick).toHaveBeenCalledOnce();
    });
});
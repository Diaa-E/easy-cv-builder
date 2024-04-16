import { describe, it, expect, vi } from "vitest";
import { screen, render, fireEvent } from "@testing-library/react";

import AddButton from "../AddButton";

describe("AddButton component", () => {

    it("Contains the add keyword", () => {

        render(<AddButton />);

        expect(screen.getByRole("button", {name: /add/i})).toBeInTheDocument();
    });

    it("Adds itemType props to button name", () => {

        render(<AddButton itemType="test"/>);

        expect(screen.getByRole("button", {name: /test/i})).toBeInTheDocument();
    });

    it("Calls onClick function once when clicked", () => {

        const onClick = vi.fn();
        render(<AddButton onclick={onClick}/>)
        const button = screen.getByRole("button", {name: /add/i});
        fireEvent.click(button);

        expect(onClick).toHaveBeenCalledOnce();
    });
});
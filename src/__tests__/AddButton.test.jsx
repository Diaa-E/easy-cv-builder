import { describe, it, expect, vi } from "vitest";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import AddButton from "../components/AddButton";

describe("AddButton component", () => {
   
    it("Renders in the DOM", () => {

        render(<AddButton/>);

        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("Contains an add icon", () => {

        render(<AddButton/>);

        expect(screen.getByRole("button").childNodes.length).toBe(1);
        expect(screen.getByRole("button").childNodes[0]).toBeInstanceOf(Image);
    });

    it("Calls onClick function when clicked", async () => {

        const user = userEvent.setup();
        const onClick = vi.fn();
        render(<AddButton onclick={onClick}/>)
        const button = screen.getByRole("button");
        await user.click(button);

        expect(onClick).toHaveBeenCalledOnce();
    });

    it("Does not call onClick function when not clicked", () => {

        const onClick = vi.fn();
        render(<AddButton onclick={onClick}/>)
        const button = screen.getByRole("button");

        expect(onClick).not.toHaveBeenCalled();
    });
});
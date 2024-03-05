import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ItemButton from "../ItemButton";
import userEvent from "@testing-library/user-event";

describe("ItemButton component", () => {

    it("Renders in the DOM", () => {

        render(<ItemButton/>);

        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("Adds class from props to the button", () => {

        render(<ItemButton colorClass="class"/>);

        expect(screen.getByRole("button")).toHaveClass("class");
    });

    it("Uses props text in the img alt text", () => {

        render(<ItemButton text={"item"}/>);

        expect(screen.getByAltText("item button icon")).toBeInTheDocument();
        expect(screen.getByAltText("item button icon")).toBeInstanceOf(Image);
    });

    it("Uses image path from props", () => {

        render(<ItemButton imgPath={"path"}/>);

        expect(screen.getByRole("img").src).toContain("path");
    });

    it("Calls onClick function when clicked", async () => {

        const user = userEvent.setup();
        const onClick = vi.fn();
        render(<ItemButton onClick={onClick}/>);
        const button = screen.getByRole("button");
        await user.click(button);

        expect(onClick).toHaveBeenCalledOnce();
    });

    it("Does not call onClick function when not clicked", () => {

        const onClick = vi.fn();
        render(<ItemButton onClick={onClick}/>);

        expect(onClick).not.toHaveBeenCalled();
    });
});
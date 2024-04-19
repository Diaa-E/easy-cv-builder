import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ItemButton from "../ItemButton";

describe("ItemButton component", () => {

    it("Adds text to button from props", () => {

        render(<ItemButton text={"click here"}/>);

        expect(screen.getByRole("button", {name: "click here"})).toBeInTheDocument();
    });

    it("Adds danger class when danger prop is true", () => {

        render(<ItemButton text={"click here"} danger={true}/>);

        expect(screen.getByRole("button", {name: "click here"})).toHaveClass(/danger/i);
    });

    it("Uses image path from props", () => {

        render(<ItemButton imgPath={"path"}/>);

        expect(screen.getByRole("img", {hidden: true}).src).toContain("path");
    });

    it("Calls onClick function when clicked", () => {

        const onClick = vi.fn();
        render(<ItemButton text={"click here"} onClick={onClick}/>);
        const button = screen.getByRole("button", {name: "click here"});
        fireEvent.click(button);

        expect(onClick).toHaveBeenCalledOnce();
    });
});
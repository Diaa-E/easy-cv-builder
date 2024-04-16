import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import FormButton from "../FormButton";

describe("FormButton component", () => {

    it("Renders text from props", () => {

        render(<FormButton text="click here"/>);

        expect(screen.getByRole("button", {name: "click here"})).toBeInTheDocument();
    });

    it("Calls onClick function when clicked", () => {

        const onClick = vi.fn();
        render(<FormButton onClick={onClick} text="click here"/>);
        const button = screen.getByRole("button", {name: "click here"});
        fireEvent.click(button);

        expect(onClick).toHaveBeenCalledOnce();
    });

    it("Adds a title from props", () => {

        render(<FormButton text="click here" toolTip="tip" />);

        expect(screen.getByRole("button", {name: "click here"}).title).toBe("tip");
    });

    it("Adds classes from props to the button", () => {

        render(<FormButton text="click here" classes={["class1", "class2"]}/>);

        expect(screen.getByRole("button", {name: "click here"})).toHaveClass("class1", "class2")
    });
});
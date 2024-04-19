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

    it("Adds primary class when passed primary style", () => {

        render(<FormButton text="click here" style="primary"/>);

        expect(screen.getByRole("button", {name: "click here"})).toHaveClass(/primary/i)
    });

    it("Adds secondary class when passed secondary style", () => {

        render(<FormButton text="click here" style="secondary"/>);

        expect(screen.getByRole("button", {name: "click here"})).toHaveClass(/secondary/i)
    });

    it("Adds danger class when passed danger style", () => {

        render(<FormButton text="click here" style="danger"/>);

        expect(screen.getByRole("button", {name: "click here"})).toHaveClass(/danger/i)
    });

    it("Adds secondary class by default", () => {

        render(<FormButton text="click here"/>);

        expect(screen.getByRole("button", {name: "click here"})).toHaveClass(/secondary/i)
    });
});
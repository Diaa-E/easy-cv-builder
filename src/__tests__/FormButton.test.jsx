import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import FormButton from "../components/FormButton";
import userEvent from "@testing-library/user-event";

describe("FormButton component", () => {

    it("Renders in DOM", () => {

        render(<FormButton/>);

        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("Renders text from props", () => {

        render(<FormButton text="click here"/>);

        expect(screen.getByRole("button").textContent).toBe("click here");
    });

    it("Calls onClick function when clicked", async () => {

        const user = userEvent.setup();
        const onClick = vi.fn();
        render(<FormButton onClick={onClick}/>);
        const button = screen.getByRole("button");
        await user.click(button);

        expect(onClick).toHaveBeenCalledOnce();
    });

    it("Does not call onClick function when not clicked", () => {

        const onClick = vi.fn();
        render(<FormButton onClick={onClick}/>);

        expect(onClick).not.toHaveBeenCalled();
    });

    it("Adds classes from props to the button", () => {

        render(<FormButton classes={["class1", "class2"]}/>);

        expect(screen.getByRole("button")).toHaveClass("class1", "class2")
    });
});
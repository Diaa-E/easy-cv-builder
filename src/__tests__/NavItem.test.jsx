import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import NavItem from "../components/NavItem";
import userEvent from "@testing-library/user-event";

describe("NavItem component", () => {

    it("Renders in the DOM", () => {

        render(<NavItem/>);

        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("Uses title prop in icon alt text", () => {

        render(<NavItem title={"nav"}/>);

        expect(screen.getByAltText("nav tab icon")).toBeInstanceOf(Image);
        expect(screen.getByAltText("nav tab icon")).toBeInTheDocument();
    });

    it("Uses icon url prop for button img src", () => {

        render(<NavItem iconUrl={"icon"}/>);

        expect(screen.getByRole("img").src).toContain("icon");
    });

    it("Adds selected class when selected prop is true", () => {

        render(<NavItem selected={true}/>);

        expect(screen.getByRole("button")).toHaveClass("selected");
    });

    it("Removes selected class when selected prop is false", () => {

        render(<NavItem selected={false}/>);

        expect(screen.getByRole("button")).not.toHaveClass("selected");
    });

    it("Calls onClick function when clicked", async () => {

        const onClick = vi.fn();
        const user = userEvent.setup();
        render(<NavItem onClick={onClick}/>);
        const button = screen.getByRole("button");
        await user.click(button);

        expect(onClick).toHaveBeenCalledOnce();
    });

    it("Does not call onClick function when not clicked", () => {

        const onClick = vi.fn();
        render(<NavItem onClick={onClick}/>);

        expect(onClick).not.toHaveBeenCalled();
    });
});

import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import NavItem from "../NavItem";
import userEvent from "@testing-library/user-event";

describe("NavItem component", () => {

    it("Renders a button labeled by title prop", () => {

        render(<NavItem title={"test"} />);

        expect(screen.queryByRole("button", {name: /test/i})).toBeInTheDocument();
    });

    it("Uses icon url prop for button img src", () => {

        render(<NavItem iconUrl={"icon"}/>);

        expect(screen.queryByRole("img", {hidden: true}).src).toContain("icon");
    });

    it("Adds selected class when selected prop is true", () => {

        render(<NavItem selected={true}/>);

        expect(screen.queryByRole("button")).toHaveClass("selected");
    });

    it("Removes selected class when selected prop is false", () => {

        render(<NavItem selected={false}/>);

        expect(screen.queryByRole("button")).not.toHaveClass("selected");
    });

    it("Calls onClick function when clicked", () => {

        const onClick = vi.fn();
        render(<NavItem onClick={onClick}/>);
        const button = screen.queryByRole("button");
        fireEvent.click(button);

        expect(onClick).toHaveBeenCalledOnce();
    });
});

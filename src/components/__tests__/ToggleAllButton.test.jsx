import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ToggleAllButton from "../ToggleAllButton";
import userEvent from "@testing-library/user-event";

describe("Toggle all button component", () => {

    it("Renders in the DOM", () => {

        render(<ToggleAllButton/>);

        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("Renders an image with prop icon path", () => {

        render(<ToggleAllButton icon={"path"}/>);

        expect(screen.getByRole("button").childNodes[0].nodeName).toBe("IMG");
        expect(screen.getByRole("button").childNodes[0].src).toContain("path");
    });

    it("Adds classes from props to the button", () => {

        render(<ToggleAllButton colorClasses={["color1", "color2"]}/>);

        expect(screen.getByRole("button")).toHaveClass("color1", "color2");
    });

    it("Adds tooltip prop to the title of the button", () => {

        render(<ToggleAllButton toolTip={"click here"}/>);

        expect(screen.getByRole("button").title).toBe("click here");
    }); 

    it("Calls onClick function once when clicked", async () => {

        const user = userEvent.setup();
        const onClick = vi.fn();
        render(<ToggleAllButton onClick={onClick}/>);
        const button = screen.getByRole("button");
        await user.click(button);

        expect(onClick).toHaveBeenCalledOnce();
    }); 

    it("Calls onClick function once when the icon is clicked", async () => {

        const user = userEvent.setup();
        const onClick = vi.fn();
        render(<ToggleAllButton onClick={onClick}/>);
        const icon = screen.getByRole("img");
        await user.click(icon);

        expect(onClick).toHaveBeenCalledOnce();
    });

    it("Does not call onClick function when not clicked", () => {

        const onClick = vi.fn();
        render(<ToggleAllButton onClick={onClick}/>);

        expect(onClick).not.toHaveBeenCalled();
    })
});
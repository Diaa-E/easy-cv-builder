import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ToggleAllButton from "../ToggleAllButton";

describe("Toggle all button component", () => {

    it("Renders an image with prop icon path", () => {

        render(<ToggleAllButton icon={"path"}/>);

        expect(screen.getByRole("img", {hidden: true}).src).toContain("path");
    });

    it("Adds classes from props to the button", () => {

        render(<ToggleAllButton toolTip={"click"} colorClasses={["color1", "color2"]}/>);

        expect(screen.getByRole("button", {name: /click/i})).toHaveClass("color1", "color2");
    });

    it("Adds tooltip prop to the title of the button", () => {

        render(<ToggleAllButton toolTip={"click"}/>);

        expect(screen.getByRole("button", {name: /click/i}).title).toBe("click");
    }); 

    it("Calls onClick function once when clicked", () => {

        const onClick = vi.fn();
        render(<ToggleAllButton toolTip={"click"} onClick={onClick}/>);
        const button = screen.getByRole("button", {name: /click/i});
        fireEvent.click(button);

        expect(onClick).toHaveBeenCalledOnce();
    }); 

    it("Calls onClick function once when the icon is clicked", () => {

        const onClick = vi.fn();
        render(<ToggleAllButton toolTip={"click"} onClick={onClick}/>);
        const icon = screen.getByRole("img", {hidden: true});
        fireEvent.click(icon);

        expect(onClick).toHaveBeenCalledOnce();
    });
});
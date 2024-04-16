import { fireEvent, render, screen } from "@testing-library/react"
import ColorInput from "../ColorInput"
import { expect, it, vi } from "vitest";

describe("ColorInput Component", () => {

    it("Renders a button with accent color in its text", () => {

        render(<ColorInput onChange={() => {}}/>);

        expect(screen.getByRole("button", {hidden: true})).toBeInTheDocument();
    });

    it("Adds a label to color input", () => {

        render(<ColorInput id={"test"} onChange={() => {}}/>);

        expect(screen.getByLabelText(/color/i).id).toBe("test");
        expect(screen.getByLabelText(/color/i).tagName).toBe("INPUT");
    });

    it("Sets the input value to the value from props", () => {

        render(<ColorInput value={"#000000"} onChange={() => {}}/>);

        expect(screen.getByDisplayValue("#000000").tagName).toBe("INPUT");
        expect(screen.getByDisplayValue("#000000")).toBeInTheDocument();
    });

    it("Color can be changed by clicking the color input element", () => {

        const onChange = vi.fn();
        render(<ColorInput value={"#000000"} onChange={onChange}/>);
        const colorSelector = screen.getByDisplayValue("#000000");
        fireEvent.change(colorSelector, {target : {value: "#ffffff"}});
        
        expect(onChange).toHaveBeenCalledOnce();
    });

    it("Color can be changed by clicking the button wrapping the color input", () => {

        const onClick = vi.fn();
        render(<ColorInput value={"#000000"} onChange={() => {}}/>);
        const colorButton = screen.getByRole("button", { hidden: true});
        const colorSelector = screen.getByDisplayValue("#000000").addEventListener("click", onClick);
        fireEvent.click(colorButton);
        
        expect(onClick).toHaveBeenCalledOnce();
    });
});
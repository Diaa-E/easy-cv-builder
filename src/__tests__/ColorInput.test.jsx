import { fireEvent, render, screen } from "@testing-library/react"
import ColorInput from "../components/ColorInput"
import { expect, it, vi } from "vitest";

describe("ColorInput Component", () => {
     
    it("Renders in DOM", () => {

        render(<ColorInput/>);

        expect(screen.getByTestId("color-input-container")).toBeInTheDocument();
    });

    it("Renders a color input wrapped by label used as a button", () => {

        render(<ColorInput/>);

        expect(screen.getByRole("button")).toBeInTheDocument();
        expect(screen.getByRole("button").nodeName).toBe("LABEL");
        expect(screen.getByRole("button").childNodes[0].nodeName).toBe("INPUT");
    });

    it("Uses the id from props", () => {

        render(<ColorInput id={"color"}/>);

        expect(screen.getByLabelText("Color").id).toBe("color");
    });

    it("Uses the name value from props", () => {

        render(<ColorInput name={"color"}/>);

        expect(screen.getByRole("button").childNodes[0].name).toBe("color");
    });

    it("Sets the input value to the value from props", () => {

        render(<ColorInput value={"#000000"}/>);

        expect(screen.getByDisplayValue("#000000")).toBeInTheDocument();
    });

    it("Calls onChange function on change", async () => {

        const onChange = vi.fn();
        render(<ColorInput value={"#000000"} onChange={onChange}/>);
        const colorSelector = screen.getByDisplayValue("#000000");
        fireEvent.change(colorSelector, {target : {value: "#ffffff"}});
        
        expect(onChange).toHaveBeenCalledOnce();
    });

    it("Does not call onChange function when input value is unchanged", () => {
        
        const onChange = vi.fn();
        render(<ColorInput value={"#000000"} onChange={onChange}/>);
        
        expect(onChange).not.toHaveBeenCalled();
    })
});
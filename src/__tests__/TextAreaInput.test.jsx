import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import TextAreaInput from "../components/TextAreaInput";

describe("TextAreaInput component", () => {

    it("Renders in the DOM", () => {

        render(<TextAreaInput/>);

        expect(screen.getByTestId("text-area-input")).toBeInTheDocument();
    });

    it("Renders a label with text from props", () => {

        render(<TextAreaInput labelText={"label text"}/>);

        expect(screen.getByText("label text")).toBeInTheDocument();
        expect(screen.getByText("label text").nodeName).toBe("LABEL");
    });

    it("Renders a text area input", () => {

        render(<TextAreaInput/>);

        expect(screen.getByRole("textbox").nodeName).toBe("TEXTAREA");
    });

    it("Renders a text area with id from props", () => {

        render(<TextAreaInput id={"input field"}/>);

        expect(screen.getByRole("textbox").id).toBe("input field");
    });

    it("Set text area value using text prop", () => {

        render(<TextAreaInput text={"test text"} />);

        expect(screen.getByRole("textbox").textContent).toBe("test text");
    });

    it("Sets text area placeholder text from props", () => {

        render(<TextAreaInput placeholder={"placeholder text"}/>);

        expect(screen.getByRole("textbox").placeholder).toBe("placeholder text");
    });

    it("Calls onChange function when text is changed", () => {

        const onChange = vi.fn();
        render(<TextAreaInput onChange={onChange}/>);
        const textArea = screen.getByRole("textbox");
        fireEvent.change(textArea, {target: {value: "text"}});

        expect(onChange).toHaveBeenCalledOnce();
    });

    it("Does not call onChange function when text is not changed", () => {

        const onChange = vi.fn();
        render(<TextAreaInput onChange={onChange}/>);

        expect(onChange).not.toHaveBeenCalled();
    });
});
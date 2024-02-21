import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import TextInput from "../components/TextInput";

describe("TextInput component", () => {

    it("Renders in the DOM", () => {

        render(<TextInput/>);

        expect(screen.getByTestId("text-input")).toBeInTheDocument();
    });

    it("Renders a label with text from props", () => {

        render(<TextInput labelText={"label text"}/>);

        expect(screen.getByText("label text")).toBeInTheDocument();
        expect(screen.getByText("label text").nodeName).toBe("LABEL");
    });

    it("Renders a text input with id from props", () => {

        render(<TextInput id={"input field"}/>);

        expect(screen.getByRole("textbox").id).toBe("input field");
    });

    it("Sets text input value using text prop", () => {

        render(<TextInput text={"test text"} />);

        expect(screen.getByRole("textbox").value).toBe("test text");
    });

    it("Sets text input placeholder text from props", () => {

        render(<TextInput placeholder={"placeholder text"}/>);

        expect(screen.getByRole("textbox").placeholder).toBe("placeholder text");
    });

    it("Calls onChange function when text is changed", () => {

        const onChange = vi.fn();
        render(<TextInput onChange={onChange}/>);
        const textArea = screen.getByRole("textbox");
        fireEvent.change(textArea, {target: {value: "text"}});

        expect(onChange).toHaveBeenCalledOnce();
    });

    it("Does not call onChange function when text is not changed", () => {

        const onChange = vi.fn();
        render(<TextInput onChange={onChange}/>);

        expect(onChange).not.toHaveBeenCalled();
    });
});
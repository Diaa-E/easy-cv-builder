import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import TextInput from "../TextInput";
import userEvent from "@testing-library/user-event";

describe("TextInput component", () => {

    it("Renders a label with text from props", () => {

        render(<TextInput labelText={"label text"}/>);

        expect(screen.queryByText("label text")).toBeInTheDocument();
    });

    it("Renders a text input with id from props", () => {

        render(<TextInput id={"input field"}/>);

        expect(screen.queryByRole("textbox").id).toBe("input field");
    });

    it("Sets text input value using text prop", () => {

        render(<TextInput text={"test text"} />);

        expect(screen.queryByRole("textbox", {value: "test text"})).toBeInTheDocument();
    });

    it("Sets text input placeholder text from props", () => {

        render(<TextInput placeholder={"placeholder text"}/>);

        expect(screen.queryByRole("textbox").placeholder).toBe("placeholder text");
    });

    it("Calls onChange function when text is changed", () => {

        const onChange = vi.fn();
        render(<TextInput onChange={onChange}/>);
        const textArea = screen.queryByRole("textbox");
        fireEvent.change(textArea, {target: {value: "text"}});

        expect(onChange).toHaveBeenCalledOnce();
    });

    it("Renders a clear text button when input field is not empty", () => {

        render(<TextInput text={"test"}/>);

        expect(screen.queryByRole("button", {name: /clear/i})).toBeInTheDocument();
    });

    it("Does not render a clear text button when input field is empty", () => {

        render(<TextInput text={""}/>);

        expect(screen.queryByRole("button", {name: /clear/i})).not.toBeInTheDocument();
    });

    it("Calls clearField function when clear field button is clicked", () => {

        const clearField = vi.fn();
        render(<TextInput clearField={clearField} text={"test"}/>);
        const clearButton = screen.queryByRole("button", {name: /clear/i});
        fireEvent.click(clearButton);

        expect(clearField).toHaveBeenCalledOnce();
    });

    it("Keeps text input in focus after clearing field", () => {

        const clearField = vi.fn();
        render(<TextInput text={"test"} clearField={clearField}/>);
        const clearButton = screen.queryByRole("button", {name: /clear/i});
        fireEvent.click(clearButton);

        expect(screen.getByRole("textbox", {value: "test"})).toEqual(document.activeElement);
    })
});
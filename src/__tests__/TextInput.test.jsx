import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import TextInput from "../components/TextInput";
import userEvent from "@testing-library/user-event";

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

    it("Render clear field button when textbox is not empty", () => {

        render(<TextInput text={"text"} />);

        expect(screen.getByTestId("clear-field-button")).toBeInTheDocument();
    });

    it("Does not render clear field button when textbox is empty", () => {

        render(<TextInput text={""}/>);

        expect(screen.queryByTestId("clear-field-button")).not.toBeInTheDocument();
    });

    it("Calls clearField function when clear field button is clicked", async () => {

        const user = userEvent.setup();
        const clearField = vi.fn();
        render(<TextInput text={"text"} clearField={clearField}/>);
        const button = screen.getByTestId("clear-field-button");
        await user.click(button);

        expect(clearField).toHaveBeenCalledOnce();
    });

    it("Does not call clearField function when clear field button is not clicked", () => {

        const clearField = vi.fn();
        render(<TextInput text={"text"} clearField={clearField}/>);

        expect(clearField).not.toHaveBeenCalled();
    });
});
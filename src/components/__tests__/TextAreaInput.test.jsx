import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import TextAreaInput from "../TextAreaInput";

describe("TextAreaInput component", () => {

    it("Labels text area with text from props", () => {

        render(<TextAreaInput labelText={"label text"}/>);

        expect(screen.queryByText("label text")).toBeInTheDocument();
    });

    it("Renders a text area with id from props", () => {

        render(<TextAreaInput id={"input field"}/>);

        expect(screen.queryByRole("textbox").id).toBe("input field");
    });

    it("Set text area value using text prop", () => {

        render(<TextAreaInput text={"test text"} />);

        expect(screen.queryByRole("textbox", {value: "test text"})).toBeInTheDocument();
    });

    it("Sets text area placeholder text from props", () => {

        render(<TextAreaInput placeholder={"placeholder text"}/>);

        expect(screen.queryByRole("textbox").placeholder).toBe("placeholder text");
    });

    it("Calls onChange function when text is changed", () => {

        const onChange = vi.fn();
        render(<TextAreaInput onChange={onChange}/>);
        const textArea = screen.queryByRole("textbox");
        fireEvent.change(textArea, {target: {value: "text"}});

        expect(onChange).toHaveBeenCalledOnce();
    });
});
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SelectInput from "../components/SelectInput";

describe("SelectInput component", () => {

    it("Renders in the DOM", () => {

        render(<SelectInput options={[]}/>);

        expect(screen.getByTestId("select-input")).toBeInTheDocument();
    });

    it("Uses id prop for select element id", () => {

        render(<SelectInput id={"select"} options={[]}/>);

        expect(screen.getByRole("listbox").id).toBe("select")
    });

    it("Renders a label with the text from props", () => {

        render(<SelectInput options={[]} labelText={"select"}/>);

        expect(screen.getByText("select")).toBeInTheDocument();
        expect(screen.getByText("select").nodeName).toBe("LABEL");
    });

    it("Renders options with value and name pairs", () => {

        const mockOptions = [
            {
                name: "option1",
                value: "1",
            },
            {
                name: "option2",
                value: "2"
            }
        ];

        render(<SelectInput options={mockOptions} optionNameKey={"name"} optionValueKey={"value"}/>);

        expect(screen.getAllByRole("option").length).toBe(2);
        screen.getAllByRole("option").forEach((option, index) => {

            expect(option.textContent).toBe(mockOptions[index].name);
            expect(option.value).toBe(mockOptions[index].value);
        })
    });

    it("Selects option from prop", () => {

        const mockOptions = [
            {
                name: "option1",
                value: "1",
            },
            {
                name: "option2",
                value: "2",
            }
        ];

        render(<SelectInput selected={"2"} options={mockOptions} optionNameKey={"name"} optionValueKey={"value"}/>);

        expect(screen.getByRole("listbox").value).toBe("2");
    });

    it("Calls onChange function when selected option is changed", () => {

        const mockOptions = [
            {
                name: "option1",
                value: "1",
            },
            {
                name: "option2",
                value: "2",
            },
            {
                name: "option3",
                value: "3",
            }
        ];

        const onChange = vi.fn();
        render(<SelectInput onChange={onChange} selected={"2"} options={mockOptions} optionNameKey={"name"} optionValueKey={"value"}/>);
        const select = screen.getByRole("listbox");
        fireEvent.change(select, {target: {value: "3"}});

        expect(onChange).toHaveBeenCalledOnce();
    });

    it("Does not call onChange function when selected option does not change", () => {

        const mockOptions = [
            {
                name: "option1",
                value: "1",
            },
            {
                name: "option2",
                value: "2",
            },
            {
                name: "option3",
                value: "3",
            }
        ];

        const onChange = vi.fn();
        render(<SelectInput onChange={onChange} selected={"2"} options={mockOptions} optionNameKey={"name"} optionValueKey={"value"}/>);

        expect(onChange).not.toHaveBeenCalled();
    });
});
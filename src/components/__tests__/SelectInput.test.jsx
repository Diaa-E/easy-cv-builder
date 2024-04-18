import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import SelectInput from "../SelectInput";

describe("SelectInput component", () => {

    function createOptions()
    {
        return [
            {
                name: "option1",
                value: "1",
            },
            {
                name: "option2",
                value: "2"
            }
        ];
    }

    it("Uses id prop for select element id", () => {

        render(<SelectInput id={"select"} options={[]}/>);

        expect(screen.queryByRole("select").id).toBe("select")
    });

    it("Labels select input with text from props", () => {

        render(<SelectInput options={[]} labelText={"select"}/>);

        expect(screen.queryByText("select")).toBeInTheDocument();
    });

    it("Renders options with value and name pairs", () => {

        const options = createOptions();
        render(<SelectInput options={options}/>);

        expect(screen.queryAllByRole("option").length).toBe(2);
        screen.queryAllByRole("option").forEach((option, index) => {

            expect(option.textContent).toBe(options[index].name);
            expect(option.value).toBe(options[index].value);
        })
    });

    it("Selects option from prop", () => {

        const options = createOptions();
        render(<SelectInput selected={"2"} options={options}/>);

        expect(screen.queryByRole("select", {value: "2"})).toBeInTheDocument();
    });

    it("Calls onChange function when selected option is changed", () => {

        const options = createOptions();
        const onChange = vi.fn();
        render(<SelectInput onChange={onChange} selected={"2"} options={options}/>);
        const select = screen.queryByRole("select");
        fireEvent.change(select, {target: {value: "1"}});

        expect(onChange).toHaveBeenCalledOnce();
    });
});
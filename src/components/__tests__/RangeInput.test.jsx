import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import RangeInput from "../RangeInput";

describe("RangeInput component", () => {

    const textLevels = [
        {
            min: 0,
            name: "test level"
        }
    ]

    it("Renders a slider input", () => {

        render(<RangeInput checked={true} onCheckedChange={() => {}} onRangeChange={() => {}} />);

        expect(screen.queryByRole("slider", {name: /level/i})).toBeInTheDocument();
    });

    it("Renders a checkbox with label text from props", () => {

        render(<RangeInput labelText={"test"} checked={true} onCheckedChange={() => {}} onRangeChange={() => {}} />);

        expect(screen.queryByRole("checkbox", {name: /test/i})).toBeInTheDocument();
    });

    it("Checks checkbox when check prop is true", () => {

        render(<RangeInput labelText={"test"} checked={true} onCheckedChange={() => {}} onRangeChange={() => {}} />);

        expect(screen.queryByRole("checkbox", {name: /test/i})).toBeChecked();
    });

    it("Unchecks checkbox when check prop is false", () => {

        render(<RangeInput labelText={"test"} checked={false} onCheckedChange={() => {}} onRangeChange={() => {}} />);

        expect(screen.queryByRole("checkbox", {name: /test/i})).not.toBeChecked();
    });

    it("Disables slider when checked is false", () => {

        render(<RangeInput labelText={"test"} checked={false} onCheckedChange={() => {}} onRangeChange={() => {}} />);

        expect(screen.queryByRole("slider", {hidden: true})).toBeDisabled();
    });

    it("Calls onCheckChange function when checkbox value is changed", () => {

        const onCheckedChange = vi.fn();
        render(<RangeInput
            labelText={"test"}
            checked={false} 
            onCheckedChange={onCheckedChange}
            onRangeChange={() => {}} 
        />);
        const checkbox = screen.queryByRole("checkbox", {name: /test/i});
        fireEvent.click(checkbox);

        expect(onCheckedChange).toHaveBeenCalledOnce();
    });

    it("Calls onRangeChange function when slider value is changed", () => {

        const onRangeChange = vi.fn();
        render(<RangeInput
            value={20}
            labelText={"test"}
            checked={true} 
            onCheckedChange={() => {}}
            onRangeChange={onRangeChange} 
        />);
        const rangeInput = screen.queryByRole("slider", {name: /level/i});
        fireEvent.change(rangeInput, {target: {value: 40}});

        expect(onRangeChange).toHaveBeenCalledOnce();
    });

    it("Displays value number when level mode is set to bar", () => {

        render(<RangeInput
            value={20}
            labelText={"test"}
            checked={true} 
            onCheckedChange={() => {}}
            onRangeChange={() => {}} 
            levelMode={"bar"}
        />);

        expect(screen.queryByText(/20/i, {hidden: true})).toBeInTheDocument();
    });

    it("Displays value as a text level when level mode is set to text", () => {

        render(<RangeInput
            value={20}
            labelText={"test"}
            checked={true} 
            onCheckedChange={() => {}}
            onRangeChange={() => {}} 
            levelMode={"text"}
            textLevels={textLevels}
        />);

        expect(screen.queryByText(/test\slevel/i, {hidden: true})).toBeInTheDocument();
    })
});
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import RangeInput from "../components/RangeInput";
import userEvent from "@testing-library/user-event";

describe("RangeInput component", () => {

    it("Render to the DOM", () => {

        render(<RangeInput/>);

        expect(screen.getByTestId("range-input")).toBeInTheDocument();
    });

    it("Uses label text prop for checkbox label", () => {

        render(<RangeInput labelText={"check"}/>);

        expect(screen.getByText("check")).toBeInTheDocument();
        expect(screen.getByText("check").nodeName).toBe("LABEL");
        expect(screen.getByText("check").childNodes[0].nodeName).toBe("INPUT");
    });

    it("Uses checked prop to set checkbox state", () => {

        render(<RangeInput checked={true}/>);

        expect(screen.getByRole("checkbox")).toBeChecked();
    });

    it("Calls onCheckedChange function when checkbox is clicked and changed", async () => {

        const user = userEvent.setup();
        const onCheckedChange = vi.fn();
        render(<RangeInput checked={false} onCheckedChange={onCheckedChange}/>);
        const checkBox = screen.getByRole("checkbox");
        await user.click(checkBox);

        expect(onCheckedChange).toHaveBeenCalledOnce();
    });

    it("Does not call onCheckedChange function when checkbox is not clicked", () => {

        const onCheckedChange = vi.fn();
        render(<RangeInput checked={false} onCheckedChange={onCheckedChange}/>);

        expect(onCheckedChange).not.toHaveBeenCalled();
    });

    it("Renders an input with type range", () => {

        render(<RangeInput/>);

        expect(screen.getByRole("slider")).toBeInTheDocument();
    });

    it("Uses value prop to set range input value", () => {

        render(<RangeInput value={40}/>);

        expect(screen.getByRole("slider").value).toBe("40");
    });

    it("Disables range input when checkbox is unchecked", () => {

        render(<RangeInput checked={false} value={20}/>);

        expect(screen.getByRole("slider")).toBeDisabled();
    });

    it("Enables range input when checkbox is checked", () => {

        render(<RangeInput checked={true} value={20}/>);

        expect(screen.getByRole("slider")).not.toBeDisabled();
    });

    it("Calls onRangeChange when range value is changed", () => {

        const onRangeChange = vi.fn();
        render(<RangeInput onRangeChange={onRangeChange} value={40}/>);
        const range = screen.getByRole("slider");
        fireEvent.change(range, {target: {value: 20}});

        expect(onRangeChange).toHaveBeenCalledOnce();
    });

    it("Does not call onChangeRange when range value is not changed", () => {

        const onRangeChange = vi.fn();
        render(<RangeInput onRangeChange={onRangeChange} value={40}/>);

        expect(onRangeChange).not.toHaveBeenCalled();
    });

    it("Uses id prop to set range id", () => {

        render(<RangeInput id={"range"}/>);

        expect(screen.getByRole("slider").id).toBe("range");
    });
});
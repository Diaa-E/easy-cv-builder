import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ConfirmDialog from "../ConfirmDialog";

describe("Confirm dialog component", () => {

    it("Renders a confirm button using prop value and a cancel button", () => {

        render(<ConfirmDialog prompt={"text"} actionText={"yes"} />);

        expect(screen.getByRole("button", {name: /cancel/i})).toBeInTheDocument();
        expect(screen.getByRole("button", {name: "yes"})).toBeInTheDocument();
    });

    it("Renders prompt text from props", () => {

        render(<ConfirmDialog prompt={"prompt text"} />);

        expect(screen.getByText("prompt text")).toBeInTheDocument();
    });

    it("Calls onCancel function once when cancel button is clicked", () => {

        const onCancel = vi.fn();
        render(<ConfirmDialog prompt={"text"} onCancel={onCancel} onConfirm={() => {}}/>);
        const button = screen.getByRole("button", {name: /cancel/i});
        fireEvent.click(button);

        expect(onCancel).toHaveBeenCalledOnce();
    });

    it("Calls onCancel function once when the backdrop is clicked", () => {

        const onCancel = vi.fn();
        const {container} = render(<ConfirmDialog prompt={"text"} onCancel={onCancel} onConfirm={() => {}}/>);
        const backdrop = container.querySelector("#dialog-backdrop");
        fireEvent.click(backdrop);
        
        expect(onCancel).toHaveBeenCalledOnce();
    });

    it("Calls onConfirm function once when confirm button is clicked", () => {

        const onConfirm = vi.fn();
        render(<ConfirmDialog prompt={"text"} actionText={"confirm"} onCancel={() => {}} onConfirm={onConfirm}/>);
        const confirmButton = screen.getByRole("button", {name: "confirm"});
        fireEvent.click(confirmButton);

        expect(onConfirm).toHaveBeenCalledOnce();
    });

    it("Only calls onConfirm function once when the confirm button is clicked", () => {

        const onConfirm = vi.fn();
        const onCancel = vi.fn();
        render(<ConfirmDialog prompt={"text"} actionText={"confirm"} onCancel={onCancel} onConfirm={onConfirm}/>);
        const button = screen.getByRole("button", {name: "confirm"});
        fireEvent.click(button);

        expect(onConfirm).toHaveBeenCalledOnce();
        expect(onCancel).not.toHaveBeenCalled();
    });
});
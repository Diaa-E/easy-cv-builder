import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ConfirmDialog from "../ConfirmDialog";
import userEvent from "@testing-library/user-event";

describe("Confirm dialog component", () => {

    function setup(jsx)
    {
        return {
            user: userEvent.setup(),
            ...render(jsx),
        }
    }

    it("Renders in the DOM", () => {

        render(<ConfirmDialog/>);

        expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("Renders 2 buttons", () => {

        render(<ConfirmDialog/>);

        expect(screen.getAllByRole("button").length).toBe(2);
    });

    it("Renders a prompt paragraph at the top", () => {

        render(<ConfirmDialog/>);

        expect(screen.getByRole("dialog").childNodes[0].nodeName).toBe("P");
    });

    it("Shows prompt from props", () => {

        render(<ConfirmDialog prompt={"prompt text"}/>);

        expect(screen.getByText("prompt text")).toBeInTheDocument();
    });

    it("Uses prop text for confirm button text", () => {

        render(<ConfirmDialog actionText={"confirm"}/>);

        expect(screen.getByRole("button", {name: "confirm"})).toBeInTheDocument();
    });

    it("Renders a cancel button independant of props", () => {

        render(<ConfirmDialog/>);

        expect(screen.getByRole("button", {name: "Cancel"})).toBeInTheDocument();
    });

    it("Only calls onCancel function once when cancel button is clicked", async () => {

        const onCancel = vi.fn();
        const onConfirm = vi.fn();
        const {user} = setup(<ConfirmDialog onCancel={onCancel} onConfirm={onConfirm}/>);
        const button = screen.getByRole("button", {name: "Cancel"});
        await user.click(button);

        expect(onCancel).toHaveBeenCalledOnce();
        expect(onConfirm).not.toHaveBeenCalled();
    });

    it("Only calls onCancel function once when the backdrop is clicked", async () => {

        const onConfirm = vi.fn();
        const onCancel = vi.fn();
        const {user} = setup(<ConfirmDialog onCancel={onCancel} onConfirm={onConfirm}/>);
        const backdrop = screen.getByTestId("backdrop");
        await user.click(backdrop);
        
        expect(onCancel).toHaveBeenCalledOnce();
        expect(onConfirm).not.toHaveBeenCalled();
    });

    it("Does not call onCancel function when the backdrop or the cancel button are not clicked", () => {

        const onConfirm = vi.fn();
        const onCancel = vi.fn();
        const {user} = setup(<ConfirmDialog onCancel={onCancel} onConfirm={onConfirm}/>);

        expect(onCancel).not.toHaveBeenCalled();
        expect(onConfirm).not.toHaveBeenCalled();
    });

    it("Only calls onConfirm function once when the confirm button is clicked", async () => {

        const onConfirm = vi.fn();
        const onCancel = vi.fn();
        const {user} = setup(<ConfirmDialog actionText={"confirm"} onCancel={onCancel} onConfirm={onConfirm}/>);
        const button = screen.getByRole("button", {name: "confirm"});
        await user.click(button);

        expect(onConfirm).toHaveBeenCalledOnce();
        expect(onCancel).not.toHaveBeenCalled();
    });

    it("Does not call onConfirm function when confirm button is not clicked", () => {

        const onConfirm = vi.fn();
        const onCancel = vi.fn();
        const {user} = setup(<ConfirmDialog actionText={"confirm"} onCancel={onCancel} onConfirm={onConfirm}/>);

        expect(onConfirm).not.toHaveBeenCalled();
        expect(onCancel).not.toHaveBeenCalled();
    });
});
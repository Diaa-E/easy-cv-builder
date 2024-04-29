import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Save from "../Save";

describe("Save component", () => {

    it("Has a download button", () => {

        render(<Save download={() => {}} upload={() => {}} status={{}} />);

        expect(screen.queryByRole("button", {name: /download/i})).toBeInTheDocument();
    });

    it("Has an upload button", () => {

        render(<Save download={() => {}} upload={() => {}} status={{}} />);

        expect(screen.queryByRole("button", {name: /upload/i})).toBeInTheDocument();
    });

    it("Calls download function when download button is clicked", () => {

        const download = vi.fn();
        render(<Save download={download} upload={() => {}} status={{}} />);
        const downloadButton = screen.queryByRole("button", {name: /download/i});
        fireEvent.click(downloadButton);

        expect(download).toHaveBeenCalledOnce();
    });

    it("Calls upload function when file input value is changed", () => {

        const upload = vi.fn();
        render(<Save download={() => {}} upload={upload} status={{}} />);
        const uploadButton = screen.queryByRole("button", {name: /upload/i});
        const fileInput = uploadButton.querySelector("input");
        fireEvent.change(fileInput, {target: {value: ""}});
        
        expect(upload).toHaveBeenCalledOnce();
    });

    it("Prints success when status code is 0", () => {

        render(<Save download={() => {}} upload={() => {}} status={{code: 0, errorLog: []}} />);
        
        expect(screen.queryByText(/success/i)).toBeInTheDocument();
    });

    it("Prints loading when status code is 1", () => {

        render(<Save download={() => {}} upload={() => {}} status={{code: 1, errorLog: []}} />);
        
        expect(screen.queryByText(/loading/i)).toBeInTheDocument();
    });

    it("Prints error and joined error log when status code is 2", () => {

        render(<Save download={() => {}} upload={() => {}} status={{code: 2, errorLog: ["error1", "error2"]}} />);
        
        expect(screen.queryByText(/error.*?error1.*?error2/i)).toBeInTheDocument();
    });

    it("Prints nothing when status code is 3", () => {

        render(<Save download={() => {}} upload={() => {}} status={{code: 3, errorLog: []}} />);
        
        expect(screen.queryByText(/success|error|loading/i)).not.toBeInTheDocument();
    });
});
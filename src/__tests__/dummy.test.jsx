import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";

import Dummy from "../components/Dummy";

describe("Vitest works correctly", () => {
    
    it("Truth is truthy", () => {

        expect(true).toBe(true);
    });

    it("False to be falsy", () => {

        expect(false).toBe(false);
    })
});

describe("React testing library works correctly", () => {

    it("Renders a dummy component correctly", () => {

        render(<Dummy/>);

        expect(screen.getByTestId("dummy")).toBeInTheDocument();
    });
});

describe("User events is works correctly", () => {

    it("Simulates a user click correctly", async () => {

        const user = userEvent.setup();
        const handleClick = vi.fn();
        render(<Dummy handleClick={handleClick}/>);
        const button = screen.getByRole("button");
        await user.click(button);

        expect(handleClick).toBeTypeOf("function");
        expect(handleClick).toHaveBeenCalled();
    });
});


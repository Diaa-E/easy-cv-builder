import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ProgressBar from "../components/ProgressBar";

describe("ProgressBar component", () => {

    it("Renders in the DOM", () => {

        render(<ProgressBar/>);

        expect(screen.getByRole("progressbar")).toBeInTheDocument();
    });

    it("Renders a div for outer part and a span for inner part", () => {

        render(<ProgressBar/>);

        expect(screen.getByRole("progressbar").nodeName).toBe("DIV");
        expect(screen.getByRole("progressbar").childNodes[0].nodeName).toBe("SPAN");
    });

    it("Adds disabled class to the outer part if the disabled prop is true", () => {

        render(<ProgressBar disabled={true}/>);

        expect(screen.getByRole("progressbar")).toHaveClass("disabled");
    });

    it("Removes disabled class to the outer part if the disabled prop is false", () => {

        render(<ProgressBar disabled={false}/>);

        expect(screen.getByRole("progressbar")).not.toHaveClass("disabled");
    });

    it("Uses passed level prop to set span's width in percent", () => {

        render(<ProgressBar disabled={false} level={20}/>);

        expect(screen.getByRole("progressbar").childNodes[0]).toHaveStyle("width: 20%");
    });
});
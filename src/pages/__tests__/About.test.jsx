import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import About from "../About";

describe("About component", () => {

    vi.mock("../../data/meta.js", () => {

        return {
            meta: {
                title: "easy cv builder",
                version: "1.0.0",
                sourceUrl: "source"
            }
        }
    });

    it("Renders heading with app title and version", () => {

        render(<About/>);

        expect(screen.queryByRole("heading", {name: /easy\scv\sbuilder/i})).toBeInTheDocument();
        expect(screen.queryByRole("heading", {name: /v1\.0\.0/i})).toBeInTheDocument();
    });

    it("Renders a link to app source code", () => {

        render(<About />);

        expect(screen.queryByRole("link", {name: /source/i})).toBeInTheDocument();
        expect(screen.queryByRole("link", {name: /source/i}).href).toContain("source");
    });
});
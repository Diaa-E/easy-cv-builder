import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ListItemLevel from "../ListItemLevel";

describe("List Item Level somponent", () => {

    vi.mock("../ItemControls.jsx", () => {

        return {
            default: () => <></>
        };
    });

    function createSampleItem() {
        return {
            id: "1",
            name: "test",
            level: 60,
            hidden: false,
            showLevel: true,
        };
    }

    function createTextLevels() {
        return [
            {
                name: "text level",
                min: 0
            },
        ];
    }

    it("Renders a list item labeled with item name", () => {

        const sampleItem = createSampleItem()
        render(<ListItemLevel itemData={sampleItem} />);

        expect(screen.queryByRole("listitem", { name: new RegExp(sampleItem.name, "i") })).toBeInTheDocument();
    });

    it("Labels item as hidden", () => {

        const sampleItem = { ...createSampleItem(), hidden: true };
        render(<ListItemLevel itemData={sampleItem} />);

        expect(screen.queryByRole("listitem", { name: new RegExp(sampleItem.name, "i") })).toBeInTheDocument();
        expect(screen.queryByRole("listitem", { name: new RegExp(sampleItem.name, "i") }).ariaLabel).toContain("hidden");
    });

    it("Labels item as visible", () => {

        const sampleItem = { ...createSampleItem(), hidden: false };
        render(<ListItemLevel itemData={sampleItem} />);

        expect(screen.queryByRole("listitem", { name: new RegExp(sampleItem.name, "i") })).toBeInTheDocument();
        expect(screen.queryByRole("listitem", { name: new RegExp(sampleItem.name, "i") }).ariaLabel).toContain("visible");
    });

    it("Does not render profiency level when showLevel is false", () => {

        const sampleItem = createSampleItem();
        render(<ListItemLevel showLevel={false} itemData={sampleItem} />);

        expect(screen.queryByText("level")).not.toBeInTheDocument();
    });

    it("Does not render profiency level when showLevel is false", () => {

        const sampleItem = createSampleItem();
        render(<ListItemLevel showLevel={false} itemData={sampleItem} />);

        expect(screen.queryByText("level")).not.toBeInTheDocument();
    });

    it("Renders a bar proficiency level", () => {

        const sampleItem = createSampleItem();
        render(<ListItemLevel levelMode={"bar"} showLevel={true} itemData={sampleItem} />);

        expect(screen.queryByRole("progressbar", { value: sampleItem.level })).toBeInTheDocument();
    });

    it("Renders a text proficiency level", () => {

        const textLevels = createTextLevels();
        const sampleItem = createSampleItem();
        render(<ListItemLevel textLevels={textLevels} levelMode={"text"} showLevel={true} itemData={sampleItem} />);

        expect(screen.queryByText(textLevels[0].name)).toBeInTheDocument();
    });

    it("Renders a delete button", () => {

        const sampleItem = createSampleItem();
        render(<ListItemLevel itemData={sampleItem}/>);

        expect(screen.queryByRole("button", {name: /delete/i})).toBeInTheDocument();
    });

    it("Calls deleteItem function when delete button is clicked", () => {

        const deleteItem = vi.fn();
        const sampleItem = createSampleItem();
        render(<ListItemLevel deleteItem={deleteItem} itemData={sampleItem}/>);
        const deleteButton = screen.queryByRole("button", {name: /delete/i});
        fireEvent.click(deleteButton);

        expect(deleteItem).toHaveBeenCalledOnce();
    });

    it("Calls deleteItem function with item id prop when delete button is clicked", () => {

        const deleteItem = vi.fn();
        const sampleItem = createSampleItem();
        render(<ListItemLevel id={sampleItem.id} deleteItem={deleteItem} itemData={sampleItem}/>);
        const deleteButton = screen.queryByRole("button", {name: /delete/i});
        fireEvent.click(deleteButton);

        expect(deleteItem).toHaveBeenCalledWith(sampleItem.id);
    });
});
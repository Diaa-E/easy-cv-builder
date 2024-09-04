import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import sampleInfo from "../../data/sampleInfo";
import Experience from "../Experience";
import { DialogContext } from "../../App";

describe("Experience component", () => {

    function setup(jsx, providerProps)
    {
        return render(
                <DialogContext.Provider value={providerProps.dispatchDialog}>
                {
                    jsx
                }
                </DialogContext.Provider>
        )
    }

    it("Renders all experience items showing at least the worplace's title", () => {

        setup(
            <Experience
                dispatchExperience={() => {}}
                experienceItems={sampleInfo.experience}
                emptyText={"empty"}
            />,
            {
                screenWidth: 1920,
                dispatchDialog: () => {}
            }
        );

        sampleInfo.experience.forEach(item => {

            expect(screen.queryByText(item.company)).toBeInTheDocument();
        });
    });

    it("Has a delete all items button", () => {

        setup(
            <Experience
                dispatchExperience={() => {}}
                experienceItems={sampleInfo.experience}
                emptyText={"empty"}
            />,
            {
                screenWidth: 1920,
                dispatchDialog: () => {}
            }
        );

        const deleteAllButton = screen.queryByRole("button", {name: /delete.*?all/i});

        expect(deleteAllButton).toBeInTheDocument();
    });

    it("Has a hide all button", () => {

        setup(
            <Experience
                dispatchExperience={() => {}}
                experienceItems={sampleInfo.experience}
                emptyText={"empty"}
            />,
            {
                screenWidth: 1920,
                dispatchDialog: () => {}
            }
        );

        const hideAllButton = screen.queryByRole("button", {name: /hide.*?all/i});

        expect(hideAllButton).toBeInTheDocument();
    });

    it("Calls dialog dispatcher when delete all button is clicked", () => {

        const dispatchDialog = vi.fn();

        setup(
            <Experience
                dispatchExperience={() => {}}
                experienceItems={sampleInfo.experience}
                emptyText={"empty"}
            />,
            {
                screenWidth: 1920,
                dispatchDialog: dispatchDialog
            }
        );

        const deleteAllButton = screen.queryByRole("button", { name: /delete.*?all/i });
        fireEvent.click(deleteAllButton);

        expect(dispatchDialog).toHaveBeenCalledOnce();
    });

    it("Calls experience dispatcher when hide all button is clicked", () => {

        const dispatchExperience = vi.fn();

        setup(
            <Experience
                dispatchExperience={dispatchExperience}
                experienceItems={sampleInfo.experience}
                emptyText={"empty"}
            />,
            {
                screenWidth: 1920,
                dispatchDialog: () => {}
            }
        );

        const hideAllButton = screen.queryByRole("button", { name: /hide.*?all/i });
        fireEvent.click(hideAllButton);

        expect(dispatchExperience).toHaveBeenCalledOnce();
    });

    it("Has an add item button", () => {

        setup(
            <Experience
                dispatchExperience={() => {}}
                experienceItems={sampleInfo.experience}
                emptyText={"empty"}
            />,
            {
                screenWidth: 1920,
                dispatchDialog: () => {}
            }
        );

        const addItemButton = screen.queryByRole("button", { name: /add.*?experience/i });

        expect(addItemButton).toBeInTheDocument();
    });

    it("Opens add item form with empty fields when add item button is clicked", () => {

        setup(
            <Experience
                dispatchExperience={() => {}}
                experienceItems={sampleInfo.experience}
                emptyText={"empty"}
            />,
            {
                screenWidth: 1920,
                dispatchDialog: () => {}
            }
        );

        const addItemButton = screen.queryByRole("button", { name: /add.*?experience/i });
        fireEvent.click(addItemButton);

        expect(screen.queryByRole("heading", {name: /add/i})).toBeInTheDocument();
        expect(screen.queryByRole("button", {name: /add/i})).toBeInTheDocument();
        expect(screen.queryByRole("button", {name: /cancel/i})).toBeInTheDocument();
        expect(screen.queryByLabelText(/company/i, {selector: "input"}).value).toBe("");
        expect(screen.queryByLabelText(/position/i, {selector: "input"}).value).toBe("");
        expect(screen.queryByLabelText(/location/i, {selector: "input"}).value).toBe("");
        expect(screen.queryByLabelText(/start/i, {selector: "input"}).value).toBe("");
        expect(screen.queryByLabelText(/end/i, {selector: "input"}).value).toBe("");
        expect(screen.queryByLabelText(/details/i, {selector: "textarea"}).value).toBe("");
    });

    it("Calls experience dispatcher when a new item is added", () => {

        const dispatchExperience = vi.fn();

        setup(
            <Experience
                dispatchExperience={dispatchExperience}
                experienceItems={sampleInfo.experience}
                emptyText={"empty"}
            />,
            {
                screenWidth: 1920,
                dispatchDialog: () => {}
            }
        );

        const addItemButton = screen.queryByRole("button", { name: /add.*?experience/i });
        fireEvent.click(addItemButton);
        const addButton = screen.queryByRole("button", { name: /add/i });
        fireEvent.click(addButton);

        expect(dispatchExperience).toHaveBeenCalledOnce();
    });

    it("Opens edit item form with fields set to current item's values when edit item button is clicked", () => {

        setup(
            <Experience
                dispatchExperience={() => {}}
                experienceItems={sampleInfo.experience}
                emptyText={"empty"}
            />,
            {
                screenWidth: 1920,
                dispatchDialog: () => {}
            }
        );

        const editItemButtons = screen.queryAllByRole("button", { name: /edit/i });
        fireEvent.click(editItemButtons[0]);

        expect(screen.queryByRole("heading", {name: /edit/i})).toBeInTheDocument();
        expect(screen.queryByRole("button", {name: /save/i})).toBeInTheDocument();
        expect(screen.queryByRole("button", {name: /cancel/i})).toBeInTheDocument();
        expect(screen.queryByLabelText(/company/i, {selector: "input"}).value).toBe(sampleInfo.experience[0].company);
        expect(screen.queryByLabelText(/position/i, {selector: "input"}).value).toBe(sampleInfo.experience[0].position);
        expect(screen.queryByLabelText(/location/i, {selector: "input"}).value).toBe(sampleInfo.experience[0].location);
        expect(screen.queryByLabelText(/start/i, {selector: "input"}).value).toBe(sampleInfo.experience[0].start);
        expect(screen.queryByLabelText(/end/i, {selector: "input"}).value).toBe(sampleInfo.experience[0].end);
        expect(screen.queryByLabelText(/details/i, {selector: "textarea"}).value).toBe(sampleInfo.experience[0].details);
    });

    it("Calls experience dispatcher when save button is clicked", () => {

        const dispatchExperience = vi.fn();

        setup(
            <Experience
                dispatchExperience={dispatchExperience}
                experienceItems={sampleInfo.experience}
                emptyText={"empty"}
            />,
            {
                screenWidth: 1920,
                dispatchDialog: () => {}
            }
        );

        const editItemButtons = screen.queryAllByRole("button", { name: /edit/i });
        fireEvent.click(editItemButtons[0]);
        const saveButton = screen.queryByRole("button", { name: /save/i });
        fireEvent.click(saveButton);

        expect(dispatchExperience).toHaveBeenCalledOnce();
    });

    it("Calls experience dispatcher when hide item button is clicked", () => {

        const dispatchExperience = vi.fn();

        setup(
            <Experience
                dispatchExperience={dispatchExperience}
                experienceItems={sampleInfo.experience}
                emptyText={"empty"}
            />,
            {
                screenWidth: 1920,
                dispatchDialog: () => {}
            }
        );

        const hideItemButtons = screen.queryAllByRole("button", { name: /hide/i });
        fireEvent.click(hideItemButtons[0]);

        expect(dispatchExperience).toHaveBeenCalledOnce();
    });

    it("Calls experience dispatcher when move item up button is clicked", () => {

        const dispatchExperience = vi.fn();

        setup(
            <Experience
                dispatchExperience={dispatchExperience}
                experienceItems={[...sampleInfo.experience, {...sampleInfo.experience[0], id: 0}]} //temporary fix
                emptyText={"empty"}
            />,
            {
                screenWidth: 1920,
                dispatchDialog: () => {}
            }
        );

        const moveUpButtons = screen.queryAllByRole("button", { name: /move.*?up/i });
        fireEvent.click(moveUpButtons[0]);

        expect(dispatchExperience).toHaveBeenCalledOnce();
    });
});
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Education from "../Education";
import sampleInfo from "../../data/sampleInfo";
import { DialogContext, ScreenWidthContext } from "../../App";

describe("Education component", () => {

    function setup(jsx, providerProps)
    {
        return render(
            <ScreenWidthContext.Provider value={{screenWidth: providerProps.screenWidth}}>
                <DialogContext.Provider value={providerProps.dispatchDialog}>
                {
                    jsx
                }
                </DialogContext.Provider>
            </ScreenWidthContext.Provider>
        );
    }

    it("Renders all education items showing at least the degree's title", () => {

        setup(
            <Education
                dispatchEducation={() => {}}
                educationItems={sampleInfo.education}
                emptyText={"empty"}
            />,
            {
                screenWidth: 1920,
                dispatchDialog: () => {}
            }
        );

        sampleInfo.education.forEach(item => {

            expect(screen.getByText(item.degree)).toBeInTheDocument();
        });
    });

    it("Has a delete all items button", () => {
        
        setup(
            <Education
                dispatchEducation={() => {}}
                educationItems={sampleInfo.education}
                emptyText={"empty"}
            />,
            {
                screenWidth: 1920,
                dispatchDialog: () => {}
            }
        );
        
        const deleteAllButton = screen.queryByRole("button", {name: /delete.*?all.*?education/i});
        
        expect(deleteAllButton).toBeInTheDocument();
    });

    it("Has a hide all items button", () => {
        
        setup(
            <Education
                dispatchEducation={() => {}}
                educationItems={sampleInfo.education}
                emptyText={"empty"}
            />,
            {
                screenWidth: 1920,
                dispatchDialog: () => {}
            }
        );
        
        const hideAllButton = screen.queryByRole("button", {name: /hide.*?all.*?education/i});
        
        expect(hideAllButton).toBeInTheDocument();
    });

    it("Calls dialog dispatcher when delete all button is clicked", () => {

        const dispatchDialog = vi.fn();
        setup(
            <Education
                dispatchEducation={() => {}}
                educationItems={sampleInfo.education}
                emptyText={"empty"}
            />,
            {
                screenWidth: 1920,
                dispatchDialog: dispatchDialog
            }
        );
        
        const deleteAllButton = screen.queryByRole("button", {name: /delete.*?all.*?education/i});
        fireEvent.click(deleteAllButton);
        
        expect(dispatchDialog).toHaveBeenCalledOnce();
    });

    it("Calls education dispatcher when hide all button is clicked", () => {

        const dispatchEducation = vi.fn();
        setup(
            <Education
                dispatchEducation={dispatchEducation}
                educationItems={sampleInfo.education}
                emptyText={"empty"}
            />,
            {
                screenWidth: 1920,
                dispatchDialog: () => {}
            }
        );
        
        const hideAllButton = screen.queryByRole("button", {name: /hide.*?all.*?education/i});
        fireEvent.click(hideAllButton);
        
        expect(dispatchEducation).toHaveBeenCalledOnce();
    });

    it("Has an add item button", () => {

        setup(
            <Education
                dispatchEducation={() => {}}
                educationItems={sampleInfo.education}
                emptyText={"empty"}
            />,
            {
                screenWidth: 1920,
                dispatchDialog: () => {}
            }
        );
        const addItemButton = screen.queryByRole("button", {name: /add.*?education/i});

        expect(addItemButton).toBeInTheDocument();
    });

    it("Opens add item form with empty fields when add item button is clicked", () => {

        setup(
            <Education
                dispatchEducation={() => {}}
                educationItems={sampleInfo.education}
                emptyText={"empty"}
            />,
            {
                screenWidth: 1920,
                dispatchDialog: () => {}
            }
        );
        const addItemButton = screen.queryByRole("button", {name: /add.*?education/i});
        fireEvent.click(addItemButton);

        expect(screen.queryByRole("heading", {name: /add/i})).toBeInTheDocument();
        expect(screen.queryByRole("button", {name: /add/i})).toBeInTheDocument();
        expect(screen.queryByRole("button", {name: /cancel/i})).toBeInTheDocument();
        expect(screen.queryByLabelText(/degree/i, {selector: "input"}).value).toBe("");
        expect(screen.queryByLabelText(/school/i, {selector: "input"}).value).toBe("");
        expect(screen.queryByLabelText(/location/i, {selector: "input"}).value).toBe("");
        expect(screen.queryByLabelText(/start/i, {selector: "input"}).value).toBe("");
        expect(screen.queryByLabelText(/end/i, {selector: "input"}).value).toBe("");
    });

    it("Calls education dispatcher when a new item is added", () => {

        const dispatchEducation = vi.fn();
        setup(
            <Education
                dispatchEducation={dispatchEducation}
                educationItems={sampleInfo.education}
                emptyText={"empty"}
            />,
            {
                screenWidth: 1920,
                dispatchDialog: () => {}
            }
        );
        const addItemButton = screen.queryByRole("button", {name: /add.*?education/i});
        fireEvent.click(addItemButton);
        const addButton = screen.queryByRole("button", {name: /add/i});
        fireEvent.click(addButton);

        expect(dispatchEducation).toHaveBeenCalled();
    });

    it("Opens edit item form with fields set to current item's values when edit item button is clicked", () => {

        setup(
            <Education
                dispatchEducation={() => {}}
                educationItems={sampleInfo.education}
                emptyText={"empty"}
            />,
            {
                screenWidth: 1920,
                dispatchDialog: () => {}
            }
        );
        const editItemButtons = screen.queryAllByRole("button", {name: /edit/i});
        fireEvent.click(editItemButtons[0]);

        expect(screen.queryByRole("heading", {name: /edit/i})).toBeInTheDocument();
        expect(screen.queryByRole("button", {name: /save/i})).toBeInTheDocument();
        expect(screen.queryByRole("button", {name: /cancel/i})).toBeInTheDocument();
        expect(screen.queryByLabelText(/degree/i, {selector: "input"}).value).toBe(sampleInfo.education[0].degree);
        expect(screen.queryByLabelText(/school/i, {selector: "input"}).value).toBe(sampleInfo.education[0].school);
        expect(screen.queryByLabelText(/location/i, {selector: "input"}).value).toBe(sampleInfo.education[0].location);
        expect(screen.queryByLabelText(/end/i, {selector: "input"}).value).toBe(sampleInfo.education[0].end);
        expect(screen.queryByLabelText(/end/i, {selector: "input"}).value).toBe(sampleInfo.education[0].start);
    });

    it("Calls education dispatcher when save button is clicked", () => {

        const dispatchEducation = vi.fn();
        setup(
            <Education
                dispatchEducation={dispatchEducation}
                educationItems={sampleInfo.education}
                emptyText={"empty"}
            />,
            {
                screenWidth: 1920,
                dispatchDialog: () => {}
            }
        );
        const editItemButtons = screen.queryAllByRole("button", {name: /edit/i});
        fireEvent.click(editItemButtons[0]);
        const saveButton = screen.queryByRole("button", {name: /save/i});
        fireEvent.click(saveButton);

        expect(dispatchEducation).toHaveBeenCalled();
    });

    it("Calls education dispatcher when hide item button is clicked", () => {

        const dispatchEducation = vi.fn()
        setup(
            <Education
                dispatchEducation={dispatchEducation}
                educationItems={sampleInfo.education}
                emptyText={"empty"}
            />,
            {
                screenWidth: 1920,
                dispatchDialog: () => {}
            }
        );
        const hideItemButtons = screen.queryAllByRole("button", {name: /hide|show/i});
        fireEvent.click(hideItemButtons[0]);

        expect(dispatchEducation).toHaveBeenCalledOnce();
    });

    it("Calls education dispatcher when move item up button is clicked", () => {

        const dispatchEducation = vi.fn()
        setup(
            <Education
                dispatchEducation={dispatchEducation}
                educationItems={sampleInfo.education}
                emptyText={"empty"}
            />,
            {
                screenWidth: 1920,
                dispatchDialog: () => {}
            }
        );
        const moveUpButtons = screen.queryAllByRole("button", {name: /move.*?up/i});
        fireEvent.click(moveUpButtons[0]);

        expect(dispatchEducation).toHaveBeenCalledOnce();
    });
});
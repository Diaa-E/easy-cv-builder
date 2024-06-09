import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Settings from "../Settings";
import fonts from "../../data/fonts";
import layouts from "../../data/layouts";
import levelModes from "../../data/levelModes";
import orderModes from "../../data/orderModes";

describe("Settings component", () => {

    it("Has a color input", () => {

        render(<Settings
            color={"#000000"}
            updateColor={() => {}}
            font={fonts[0].value}
            updateFont={() => {}}
            layout={layouts[0].value}
            updateLayout={() => {}}
            levelMode={levelModes[0].value}
            setLevelMode={() => {}}
            order={orderModes[0].value}
            setOrder={() => {}}
        />);
        const colorInput = screen.queryByLabelText(/color/i, {selector: "input"});
        expect(colorInput.value).toBe("#000000");
    });

    it("Calls update color function when color input value is changed", () => {

        const updateColor = vi.fn();
        render(<Settings
            color={"#000000"}
            updateColor={updateColor}
            font={fonts[0].value}
            updateFont={() => {}}
            layout={layouts[0].value}
            updateLayout={() => {}}
            levelMode={levelModes[0].value}
            setLevelMode={() => {}}
            order={orderModes[0].value}
            setOrder={() => {}}
        />);
        const colorInput = screen.queryByLabelText(/color/i, {selector: "input"});
        fireEvent.change(colorInput, {target: {value: "#ffffff"}});

        expect(updateColor).toHaveBeenCalledOnce();
    });

    it("Has a font selector", () => {

        render(<Settings
            color={"#000000"}
            updateColor={() => {}}
            font={fonts[0].value}
            updateFont={() => {}}
            layout={layouts[0].value}
            updateLayout={() => {}}
            levelMode={levelModes[0].value}
            setLevelMode={() => {}}
            order={orderModes[0].value}
            setOrder={() => {}}
        />);
        const colorInput = screen.queryByLabelText(/font/i, {selector: "select"});
        expect(colorInput.value).toBe(fonts[0].value);
    });

    it("Calls update font function when selected font is changed", () => {

        const updateFont = vi.fn();
        render(<Settings
            color={"#000000"}
            updateColor={() => {}}
            font={fonts[0].value}
            updateFont={updateFont}
            layout={layouts[0].value}
            updateLayout={() => {}}
            levelMode={levelModes[0].value}
            setLevelMode={() => {}}
            order={orderModes[0].value}
            setOrder={() => {}}
        />);
        const fontSelector = screen.queryByLabelText(/font/i, {selector: "select"});
        fireEvent.change(fontSelector, {target: {value: fonts[1].value}});

        expect(updateFont).toHaveBeenCalledOnce();
    });

    it("Has a layout selector", () => {

        render(<Settings
            color={"#000000"}
            updateColor={() => {}}
            font={fonts[0].value}
            updateFont={() => {}}
            layout={layouts[0].value}
            updateLayout={() => {}}
            levelMode={levelModes[0].value}
            setLevelMode={() => {}}
            order={orderModes[0].value}
            setOrder={() => {}}
        />);
        const layoutSelector = screen.queryByLabelText(/layout/i, {selector: "select"});

        expect(layoutSelector.value).toBe(layouts[0].value);
    });

    it("Calls update layout function when layout selector value is changed", () => {

        const updateLayout = vi.fn();
        render(<Settings
            color={"#000000"}
            updateColor={() => {}}
            font={fonts[0].value}
            updateFont={() => {}}
            layout={layouts[0].value}
            updateLayout={updateLayout}
            levelMode={levelModes[0].value}
            setLevelMode={() => {}}
            order={orderModes[0].value}
            setOrder={() => {}}
        />);
        const layoutSelector = screen.queryByLabelText(/layout/i, {selector: "select"});
        fireEvent.change(layoutSelector, {target: {value: layouts[1].value}})

        expect(updateLayout).toHaveBeenCalledOnce();
    });

    it("Has level mode selector", () => {

        render(<Settings
            color={"#000000"}
            updateColor={() => {}}
            font={fonts[0].value}
            updateFont={() => {}}
            layout={layouts[0].value}
            updateLayout={() => {}}
            levelMode={levelModes[0].value}
            setLevelMode={() => {}}
            order={orderModes[0].value}
            setOrder={() => {}}
        />);
        const levelModeSelector = screen.queryByLabelText(/level/i, {selector: "select"});

        expect(levelModeSelector).toBeInTheDocument();
    });

    it("Calls set level mode function when level mode selector value is changed", () => {

        const setLevelMode = vi.fn();
        render(<Settings
            color={"#000000"}
            updateColor={() => {}}
            font={fonts[0].value}
            updateFont={() => {}}
            layout={layouts[0].value}
            updateLayout={() => {}}
            levelMode={levelModes[0].value}
            setLevelMode={setLevelMode}
            order={orderModes[0].value}
            setOrder={() => {}}
        />);
        const levelModeSelector = screen.queryByLabelText(/level/i, {selector: "select"});
        fireEvent.change(levelModeSelector, {target: {value: levelModes[1].value}})
        
        expect(setLevelMode).toHaveBeenCalledOnce();
    });

    it("Has order mode selector", () => {

        render(<Settings
            color={"#000000"}
            updateColor={() => {}}
            font={fonts[0].value}
            updateFont={() => {}}
            layout={layouts[0].value}
            updateLayout={() => {}}
            levelMode={levelModes[0].value}
            setLevelMode={() => {}}
            order={orderModes[0].value}
            setOrder={() => {}}
        />);
        const orderModeSelector = screen.queryByLabelText(/order/i, {selector: "select"});

        expect(orderModeSelector).toBeInTheDocument();
    });

    it("Has calls set order function when order mode selector value is changed", () => {

        const setOrder = vi.fn();
        render(<Settings
            color={"#000000"}
            updateColor={() => {}}
            font={fonts[0].value}
            updateFont={() => {}}
            layout={layouts[0].value}
            updateLayout={() => {}}
            levelMode={levelModes[0].value}
            setLevelMode={() => {}}
            order={orderModes[0].value}
            setOrder={setOrder}
        />);
        const orderModeSelector = screen.queryByLabelText(/order/i, {selector: "select"});
        fireEvent.change(orderModeSelector, {target: {value: orderModes[1].value}})

        expect(setOrder).toHaveBeenCalled();
    });
});
import ColorInput from "./ColorInput"
import SelectInput from "./SelectInput"

export default function Settings({enabled = true, color, updateColor, font, updateFont, layout, updateLayout})
{
    const fonts = [
        {
            name: "Roboto Regular",
            value: "regular"
        },
        {
            name: "Roboto Slab",
            value: "slab",
        },
        {
            name: "Roboto Condensed",
            value: "condensed"
        },
        {
            name: "Roboto Flex",
            value: "flex"
        },
        {
            name: "Roboto Mono",
            value: "mono"
        },
        {
            name: "Roboto Serif",
            value: "serif"
        }
    ];

    const layouts = [
        {
            name: "Simple",
            value: "layout-01"
        },
        {
            name: "Modern",
            value: "layout-02"
        },
    ];

    if (enabled)
    {
        return (
            <div className="items-container">
                <ColorInput
                    onChange={updateColor}
                    id={"colorSelector"}
                    name={"colorSelector"}
                    value={color}
                />
                <SelectInput
                    options={fonts}
                    optionNameKey={"name"}
                    optionValueKey={"value"}
                    selected={font}
                    onChange={updateFont}
                    labelText={"Font"}
                    id={"fonts"}
                />
                <SelectInput
                    options={layouts}
                    optionNameKey={"name"}
                    optionValueKey={"value"}
                    selected={layout}
                    onChange={updateLayout}
                    labelText={"Layout"}
                    id={"layouts"}
                />
            </div>
        )
    }
    else
    {
        return <></>
    }
}
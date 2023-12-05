import ColorInput from "./ColorInput"
import SelectInput from "./SelectInput"

export default function Settings({enabled = true, color, updateColor, font, updateFont})
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
    ]

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
            </div>
        )
    }
    else
    {
        return <></>
    }
}
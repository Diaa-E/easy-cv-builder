import ColorInput from "./ColorInput"
import SelectInput from "./SelectInput"
import fonts from "../fonts";
import layouts from "../layouts";

export default function Settings({enabled = true, color, updateColor, font, updateFont, layout, updateLayout})
{
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
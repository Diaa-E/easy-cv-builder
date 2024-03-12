import ColorInput from "../components/ColorInput"
import SelectInput from "../components/SelectInput"
import fonts from "../data/fonts";
import layouts from "../data/layouts";

export default function Settings({color, updateColor, font, updateFont, layout, updateLayout, order, setOrder})
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
            <SelectInput
                options={[{name: "Education first", value: "educationFirst"}, {name: "Experience first", value: "experienceFirst"}]}
                optionNameKey={"name"}
                optionValueKey={"value"}
                selected={order}
                onChange={setOrder}
                labelText={"Order"}
                id={"order"}
            />
        </div>
        )
}
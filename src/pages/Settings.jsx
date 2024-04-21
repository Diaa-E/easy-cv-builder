import ColorInput from "../components/ColorInput"
import SelectInput from "../components/SelectInput"
import fonts from "../data/fonts";
import layouts from "../data/layouts";
import styles from "../styles/App.module.css";

export default function Settings({color, updateColor, font, updateFont, layout, updateLayout, order, setOrder, levelMode, setLevelMode})
{
    return (
        <div className={styles["items-container"]}>
            <ColorInput
                onChange={updateColor}
                id={"colorSelector"}
                name={"colorSelector"}
                value={color}
            />
            <SelectInput
                options={fonts}
                selected={font}
                onChange={updateFont}
                labelText={"Font"}
                id={"fonts"}
            />
            <SelectInput
                options={layouts}
                selected={layout}
                onChange={updateLayout}
                labelText={"Layout"}
                id={"layouts"}
            />
            <SelectInput
                options={[{name: "Education first", value: "educationFirst"}, {name: "Experience first", value: "experienceFirst"}]}
                selected={order}
                onChange={setOrder}
                labelText={"Order"}
                id={"order"}
            />
            <SelectInput
                options={[{name: "Text", value: "text"}, {name: "Bar", value: "bar"}]}
                selected={levelMode}
                onChange={setLevelMode}
                labelText={"Proficiency Level Style"}
                id={"proficiency level style"}
            />
        </div>
        )
}
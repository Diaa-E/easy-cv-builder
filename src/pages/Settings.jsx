import ColorInput from "../components/ColorInput"
import SelectInput from "../components/SelectInput"
import fonts from "../data/fonts";
import layouts from "../data/layouts";
import levelModes from "../data/levelModes";
import orderModes from "../data/orderModes";
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
                options={orderModes}
                selected={order}
                onChange={setOrder}
                labelText={"Order"}
                id={"order"}
            />
            <SelectInput
                options={levelModes}
                selected={levelMode}
                onChange={setLevelMode}
                labelText={"Proficiency Level Style"}
                id={"proficiency-level-style"}
            />
        </div>
        )
}
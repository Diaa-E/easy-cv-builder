import styles from "../styles/RangeInput.module.css";
import { calculateTextLevel } from "../utils/calculateTextLevel";

export default function RangeInput({labelText, checked, value, id, onRangeChange, onCheckedChange, levelMode, textLevels})
{
    return (
        <div className={styles["range-input-container"]}>
            <label id="checkbox-label" className={styles["range-input-label"]} htmlFor="checkBox">
                <input
                    aria-labelledby="checkbox-label"
                    id="checkBox"
                    type="checkbox"
                    checked={checked}
                    onChange={onCheckedChange}
                />
                {labelText}
            </label>
            <input
                aria-label="proficiency level"
                id={id}
                type="range"
                value={value}
                max={100}
                min={0}
                step={20}
                className={styles["range-input"]}
                onChange={onRangeChange}
                disabled={!checked}
                aria-hidden={!checked}
            />
            <p aria-hidden={!checked} className={styles["level-text"]}>
            {
                levelMode === "bar" &&
                value + "%"
            }
            {
                levelMode === "text" &&
                calculateTextLevel(textLevels, value)
            }
            </p>
        </div>
    )
}
import "../styles/RangeInput.css";
import { calculateTextLevel } from "../utils/calculateTextLevel";

export default function RangeInput({labelText, checked, value, id, onRangeChange, onCheckedChange, levelMode, textLevels})
{
    return (
        <div data-testid="range-input" className="range-input-container">
            <label className="range-input-label" htmlFor="checkBox">
                <input
                    id="checkBox"
                    type="checkbox"
                    checked={checked}
                    onChange={onCheckedChange}
                />
                {labelText}
            </label>
            <input
                id={id}
                type="range"
                value={value}
                max={100}
                min={0}
                step={20}
                className="range-input"
                onChange={onRangeChange}
                disabled={!checked}
            />
            <p className="level-text">
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
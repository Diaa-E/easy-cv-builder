import "../styles/ColorInput.css";
import { useRef } from "react";

export default function ColorInput({id, name, onChange, value})
{
    const colorInputRef = useRef(null);

    const labelStyle = {
        backgroundColor: value,
    }

    return (
        <div className="text-input-container">
            <label htmlFor={id} className="color-input-label-text">Color</label>
            <button
                onClick={() => colorInputRef.current.click()}
                style={labelStyle}
                className="color-input-label"
                aria-hidden
            >
                <input
                    aria-label="change CV accent color"
                    id={id}
                    ref={colorInputRef}
                    name={name}
                    type="color"
                    onChange={onChange}
                    className="color-input"
                    value={value}
                >
                </input>
            </button>
        </div>
    )
}
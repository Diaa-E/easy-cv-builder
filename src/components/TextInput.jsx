import styles from  "../styles/TextInput.module.css";
import appIcons from "../data/appIconsBarrel";
import { useRef } from "react";

export default function TextInput({labelText, text, placeholder, id, onChange = () => {}, clearField})
{
    const textInputRef = useRef(null);

    return (
        <div className="text-input-container">
            <label className="text-input-label" htmlFor={id}>
                {labelText}
            </label>
            <input
                ref={textInputRef}
                id={id}
                type="text"
                value={text}
                placeholder={placeholder}
                className="text-input-field"
                onChange={onChange}
                name={id}
            />
            {
                !(text === "") &&
                <button
                    title="Clear field"
                    onClick={() => {
                        clearField();
                        textInputRef.current.focus();
                    }}
                    className="clear-button"
                    aria-label="clear field"
                >
                <img aria-hidden src={appIcons.clear} alt="Clear field button icon" />
                </button>
            }
        </div>
    )
}
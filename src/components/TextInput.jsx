import "../styles/TextInput.css";
import appIcons from "../appIconsBarrel";

export default function TextInput({labelText, text, placeholder, id, onChange = () => {}, clearField})
{
    return (
        <div data-testid="text-input" className="text-input-container">
            <label className="text-input-label" htmlFor={id}>
                {labelText}
            </label>
            <input
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
                <button data-testid="clear-field-button" title="Clear field" onClick={clearField} className="clear-button">
                    <img src={appIcons.clear} alt="Clear field button icon" />
                </button>
            }
        </div>
    )
}
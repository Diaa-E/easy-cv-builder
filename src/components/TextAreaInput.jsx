import "../styles/TextAreaInput.css";

export default function TextAreaInput({labelText, text, placeholder, id, onChange = () => {}})
{
    return (
        <div className="text-area-input-container">
            <label id={id + "-label"} className="text-area-input-label" htmlFor={id}>
                {labelText}
            </label>
            <textarea
                aria-labelledby={id + "-label"}
                id={id}
                type="text"
                value={text}
                placeholder={placeholder}
                className="text-area-input-field"
                onChange={onChange}
                rows={5}
            />
        </div>
    )
}
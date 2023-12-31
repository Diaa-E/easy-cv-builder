import "../styles/TextInput.css";

export default function TextInput({labelText, text, placeholder, id, onChange = () => {}})
{
    return (
        <div className="text-input-container">
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
            />
        </div>
    )
}
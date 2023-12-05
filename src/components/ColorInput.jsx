import "../styles/ColorInput.css"

export default function ColorInput({id, name, onChange, value})
{
    const labelStyle = {
        backgroundColor: value,
    }

    return (
        <>
            <label className="color-input-label-text">Color</label>
            <label style={labelStyle} htmlFor={id} className="color-input-label">
                <input
                    name={name}
                    id={id}
                    type="color"
                    onChange={onChange}
                    className="color-input"
                    value={value}
                >
                </input>
            </label>
        </>
    )
}
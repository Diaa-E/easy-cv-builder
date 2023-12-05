import ColorInput from "./ColorInput"

export default function Settings({enabled = true, color, updateColor})
{
    if (enabled)
    {
        return (
            <div className="items-container">
                <h2>Color</h2>
                <ColorInput
                    onChange={updateColor}
                    id={"colorSelector"}
                    name={"colorSelector"}
                    value={color}
                />
            </div>
        )
    }
    else
    {
        return <></>
    }
}
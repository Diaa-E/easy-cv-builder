import "../styles/Save.css";
import "../styles/FormButton.css"

export default function Save({download, enabled})
{
    if (enabled)
    {
        return (
            <div className="items-container">
                <button onClick={download} className="form-button blue-button">
                    Download Draft
                </button>
                <button className="form-button white-button">
                    Upload Draft
                </button>
            </div>
        )
    }
    else
    {
        return <></>
    }
}
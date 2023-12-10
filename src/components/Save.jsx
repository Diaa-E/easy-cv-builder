import "../styles/Save.css";
import "../styles/FormButton.css"

export default function Save({upload, download, enabled})
{
    if (enabled)
    {
        return (
            <div className="items-container">
                <button onClick={download} className="form-button blue-button">
                    Download Draft
                </button>
                <label htmlFor="uploadDraft" className="form-button white-button">
                    <input onChange={upload} className="file-input" id="uploadDraft" type="file" accept=".json"/>
                    Upload Draft
                </label>
            </div>
        )
    }
    else
    {
        return <></>
    }
}
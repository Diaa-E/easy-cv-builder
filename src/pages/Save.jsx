import styles from "../styles/Save.module.css";

export default function Save({upload, download, status})
{
    return (
        <div className={styles["save-container"]}>
            <button
                title="Download a copy of your data"
                onClick={download}
                className={styles["download-draft-button"]}
            >
                Download Draft
            </button>
            <label
                title="Upload a saved copy of your data"
                role="button"
                htmlFor="uploadDraft"
                className={styles["upload-draft-button"]}
            >
                <input
                    onChange={upload}
                    className={styles["file-input"]}
                    id="uploadDraft"
                    type="file"
                    accept=".json"
                />
                Upload Draft
            </label>
            <StatusPanel
                status={status}
            />
        </div>
    )
}

function StatusPanel({status})
{
    switch (+status.code)
    {
        case 0: return <p style={{color: "var(--accent)"}}>Draft loaded successfully.</p>
        case 1: return <p style={{color: "var(--text)"}}>Loading...</p>
        case 2: return <p style={{color: "var(--danger)"}}>Error - Invalid data fields found in the draft: <br></br>{status.errorLog.join(", ")}</p>
        case 4: return <></>
    }
}
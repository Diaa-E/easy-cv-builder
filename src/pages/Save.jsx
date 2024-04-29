import { useRef } from "react";
import styles from "../styles/Save.module.css";

export default function Save({upload, download, status})
{
    const fileInputRef = useRef(null);

    return (
        <div className={styles["save-container"]}>
            <button
                title="Download a copy of your data"
                onClick={download}
                className={styles["download-draft-button"]}
            >
                Download Draft
            </button>
            <button
                title="Upload a saved copy of your data"
                role="button"
                htmlFor="uploadDraft"
                className={styles["upload-draft-button"]}
                onClick={() => fileInputRef.current.click()}
            >
                <input
                    onChange={upload}
                    className={styles["file-input"]}
                    id="uploadDraft"
                    type="file"
                    accept=".json"
                    ref={fileInputRef}
                    aria-hidden
                />
                Upload Draft
            </button>
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
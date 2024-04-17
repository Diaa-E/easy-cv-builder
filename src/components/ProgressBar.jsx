import "../styles/ProgressBar.css";

export default function ProgressBar({level, disabled})
{
    return (
        <div role="progressbar" aria-label="proficiency level" aria-valuenow={`${level}%`} className={`progress-bar-outer ${disabled ? "disabled" : ""}`} role="progressbar">
            <span className="progress-bar-inner" style={{width: `${level}%`}}></span>
        </div>
    )
}
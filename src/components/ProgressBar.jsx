import "../styles/ProgressBar.css";

export default function ProgressBar({level, disabled, label})
{
    return (
        <div aria-labelledby={label} aria-valuenow={`${level}%`} className={`progress-bar-outer ${disabled ? "disabled" : ""}`} role="progressbar">
            <span className="progress-bar-inner" style={{width: `${level}%`}}></span>
        </div>
    )
}
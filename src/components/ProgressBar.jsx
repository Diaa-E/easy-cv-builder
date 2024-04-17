import "../styles/ProgressBar.css";

export default function ProgressBar({level, disabled})
{
    return (
        <div
            role="progressbar"
            aria-label="proficiency level"
            aria-valuenow={`${level} percent`}
            className={`progress-bar-outer ${disabled ? "disabled" : ""}`}
        >
            <span aria-hidden className="progress-bar-inner" style={{width: `${level}%`}}></span>
        </div>
    )
}
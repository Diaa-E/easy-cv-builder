import "../styles/ProgressBar.css";

export default function ProgressBar({level, disabled})
{
    return (
        <div className={`progress-bar-outer ${disabled ? "disabled" : ""}`} role="progressbar">
            <span className="progress-bar-inner" style={{width: `${level}%`}}></span>
        </div>
    )
}
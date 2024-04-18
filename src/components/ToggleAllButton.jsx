import "../styles/ToggleAllButton.css";

export default function ToggleAllButton({icon, onClick, toolTip, colorClasses = []})
{
    return (
        <button
            onClick={onClick}
            className={`toggle-all-button ${colorClasses.join(" ")}`}
            title={toolTip}
            aria-label={toolTip}
        >
            <img aria-hidden src={icon} alt={toolTip + " button icon"} />
        </button>
    )
}
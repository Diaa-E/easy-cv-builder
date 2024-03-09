export default function ToggleAllButton({icon, onClick, toolTip, colorClasses = []})
{
    return (
        <button onClick={onClick} className={`toggle-all-button ${colorClasses.join(" ")}`} title={toolTip}>
            <img src={icon} alt={toolTip + " button icon"} />
        </button>
    )
}
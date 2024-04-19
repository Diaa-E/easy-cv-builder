import styles from "../styles/ToggleAllButton.module.css";

export default function ToggleAllButton({icon, onClick, toolTip, danger = false})
{
    return (
        <button
            onClick={onClick}
            className={[styles["toggle-all-button"], danger ? styles["toggle-all-button-danger"] : ""].join(" ")}
            title={toolTip}
            aria-label={toolTip}
        >
            <img aria-hidden src={icon} alt={toolTip + " button icon"} />
        </button>
    )
}
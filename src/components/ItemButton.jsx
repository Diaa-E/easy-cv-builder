import styles from "../styles/ItemButton.module.css";

export default function ItemButton({danger = false, imgPath, text, onClick = () => {}, toolTip = `${text}`})
{
    return (
        <button
            aria-label={text}
            title={toolTip}
            onClick={onClick}
            className={[styles["item-button"], danger ? styles["item-button-danger"] : ""].join(" ")}
        >
            <img aria-hidden src={imgPath} alt={`${toolTip} button icon`} />
        </button>
    )
}
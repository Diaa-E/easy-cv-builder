import styles from "../styles/AddButton.module.css";
import appIcons from "../data/appIconsBarrel";

export default function AddButton({onclick = () => {}, itemType = ""})
{
    return (
        <>
            <button
                aria-label={`add a new ${itemType}`}
                title={`add a new ${itemType}`}
                onClick={onclick}
                className={styles["add-button"]}
            >
                <img src={appIcons.add} alt={`add a new ${itemType}`} />
            </button>
        </>
    )
}
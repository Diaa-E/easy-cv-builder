import styles from "../styles/ListItem.module.css";
import appIcons from "../data/appIconsBarrel";

import ItemButton from "./ItemButton";
import ItemControls from "./ItemControls";

export default function LinkItem({website, iconPath, text, hidden = false, id, toggleHide, toggleEdit, deleteItem, moveItemUp})
{
    return (
        <li
            aria-label={`${website} link (${hidden ? "hidden" : "visible"})`}
            className={hidden ? styles["list-item-hidden"] : styles["list-item"]}
        >
            <ItemButton
                onClick={() => deleteItem(id)}
                text="delete item"
                imgPath={appIcons.delete}
                danger={true}
            />
            <div className={[styles["item-details"], styles["item-details-row"]].join(" ")}>
                <img className={styles["item-icon"]} src={iconPath} alt="item icon" />
                <p title={text} aria-label={`url`} >{text}</p>
            </div>
            <ItemControls 
                moveItemUp={() => moveItemUp(id)}
                toggleEdit={() => toggleEdit(id)} 
                toggleHide={() => toggleHide(id)}
                hidden={hidden}
            />
        </li>
    )
}
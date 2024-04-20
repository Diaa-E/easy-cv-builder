import styles from "../styles/ListItem.module.css";
import appIcons from "../data/appIconsBarrel";

import ItemButton from "./ItemButton";
import ItemControls from "./ItemControls";

export default function ListItemText({title, firstLine, secondLine, hidden = false, id, toggleHide, toggleEdit, deleteItem, moveItemUp})
{
    return (
        <li
            aria-label={`${title} (${hidden ? "hidden" : "visible"})`}
            className={hidden ? styles["list-item-hidden"] : styles["list-item"]}
        >
            <ItemButton
                onClick={() => deleteItem(id)}
                text="delete item"
                imgPath={appIcons.delete}
                danger={true}
            />
            <div className={[styles["item-details"], styles["item-details-column"]].join(" ")}>
                <p title={firstLine}>{firstLine}</p>
                <p title={secondLine}>{secondLine}</p>
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
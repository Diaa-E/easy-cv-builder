import styles from "../styles/ListItem.module.css";
import appIcons from "../data/appIconsBarrel";

import ItemButton from "./ItemButton";
import ItemControls from "./ItemControls";

export default function ListItemText({title, firstLine, secondLine, hidden = false, id, toggleEdit, dispatchList, setDialogState})
{
    return (
        <li
            aria-label={`${title} (${hidden ? "hidden" : "visible"})`}
            className={hidden ? styles["list-item-hidden"] : styles["list-item"]}
        >
            <ItemButton
                onClick={() => {
                    setDialogState({
                        open: true,
                        actionText: "Delete",
                        dangerAction: true,
                        prompt: `Are you sure you want to *premenantly delete* ${firstLine}?`,
                        onConfirm: () => {
                            dispatchList({type: "deleteItem", itemId: id});
                        }
                    });
                }}
                text="delete item"
                imgPath={appIcons.delete}
                danger={true}
            />
            <div className={[styles["item-details"], styles["item-details-column"]].join(" ")}>
                <p title={firstLine}>{firstLine}</p>
                <p title={secondLine}>{secondLine}</p>
            </div>
            <ItemControls 
                moveItemUp={() => dispatchList({type: "moveUp", itemId: id})}
                toggleEdit={toggleEdit} 
                toggleHide={() => dispatchList({type: "toggleHideItem", itemId: id})}
                hidden={hidden}
            />
        </li>
    )
}
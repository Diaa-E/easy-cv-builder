import styles from "../styles/ListItem.module.css";
import appIcons from "../data/appIconsBarrel";

import ItemButton from "./ItemButton";
import ItemControls from "./ItemControls";

import { DialogContext } from "../App";
import { useContext } from "react";

export default function ListItemText({title, firstLine, secondLine, hidden = false, id, toggleEdit, dispatchList})
{
    const dispatchDialog = useContext(DialogContext);

    return (
        <li
            aria-label={`${title} (${hidden ? "hidden" : "visible"})`}
            className={hidden ? styles["list-item-hidden"] : styles["list-item"]}
        >
            <ItemButton
                onClick={() => {
                    dispatchDialog({
                        type: "openDanger",
                        prompt: `Are you sure you want to *premenantly delete* ${firstLine}?`,
                        actionText: "Delete",
                        onConfirm: () => dispatchList({type: "deleteItem", itemId: id})
                    })
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
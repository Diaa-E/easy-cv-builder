import styles from "../styles/ListItem.module.css";
import appIcons from "../data/appIconsBarrel";

import ItemButton from "./ItemButton";
import ItemControls from "./ItemControls";
import useConfirmDialog from "../hooks/useConfirmDialog";

export default function LinkItem({website, iconPath, text, hidden = false, id, dispatchList, toggleEdit, firsItem})
{
    const [confirmDialogState, dispatchConfirmDialog, confirmDialog] = useConfirmDialog();

    return (
        <li
            aria-label={`${website} link (${hidden ? "hidden" : "visible"})`}
            className={[hidden ? styles["list-item-hidden"] : styles["list-item"], styles["list-item-in"]].join(" ")}
        >
            <ItemButton
                onClick={() => {
                    dispatchConfirmDialog({
                        type: "openDanger",
                        prompt: `Are you sure you want to *premenantly delete* ${text}?`,
                        actionText: "Delete",
                        onConfirm: () => dispatchList({type: "deleteItem", itemId: id}),
                    })
                }}
                text="delete item"
                imgPath={appIcons.delete}
                danger={true}
            />
            <div className={[styles["item-details"], styles["item-details-row"]].join(" ")}>
                <img className={styles["item-icon"]} src={iconPath} alt="item icon" />
                <p title={text} aria-label={`url`} >{text}</p>
            </div>
            <ItemControls 
                moveItemUp={() => dispatchList({type: "moveUp", itemId: id})}
                toggleEdit={toggleEdit} 
                toggleHide={() => dispatchList({type: "toggleHideItem", itemId: id})}
                hidden={hidden}
                firstItem={firsItem}
                itemTitle={website}
            />
            {
                confirmDialogState.open && confirmDialog
            }
        </li>
    )
}
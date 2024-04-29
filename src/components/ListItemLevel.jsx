import styles from "../styles/ListItem.module.css";
import appIcons from "../data/appIconsBarrel";

import ItemButton from "./ItemButton";
import ItemControls from "./ItemControls";
import ProgressBar from "./ProgressBar";
import LevelText from "./LevelText";

import { DialogContext } from "../App";
import { useContext } from "react";

//All metered values range from 0 to 100 with increments of 20
export default function ListItemLevel({itemData, levelMode, id, textLevels, dispatchList, toggleEdit, firstItem})
{
    const dispatchDialog = useContext(DialogContext);

    return (
        <li
            aria-label={`${itemData.name} (${itemData.hidden ? "hidden" : "visible"})`}
            className={itemData.hidden ? styles["list-item-hidden"] : styles["list-item"]}
        >
            <ItemButton
                onClick={() => {
                    dispatchDialog({
                        type: "openDanger",
                        prompt: `Are you sure you want to *premenantly delete* ${itemData.name}?`,
                        actionText: "Delete",
                        onConfirm: () => dispatchList({type: "deleteItem", itemId: id}),
                    })
                }}
                text="delete item"
                imgPath={appIcons.delete}
                danger={true}
            />
            <div className={[styles["item-details"], styles["item-details-column"]].join(" ")}>
                <p title={itemData.name} id="name">{itemData.name}</p>
                {
                    itemData.showLevel &&
                    <>
                        {
                            levelMode === "bar" &&
                            <ProgressBar level={itemData.level} disabled={itemData.hidden}/>
                        }
                        {
                            levelMode === "text" &&
                            <LevelText itemData={itemData} textLevels={textLevels}/>
                        }
                    </>
                }
            </div>
            <ItemControls 
                moveItemUp={() => dispatchList({type: "moveUp", itemId: id})}
                toggleEdit={toggleEdit} 
                toggleHide={() => dispatchList({type: "toggleHideItem", itemId: id})}
                hidden={itemData.hidden}
                firstItem={firstItem}
                itemTitle={itemData.name}
            />
        </li>
    )
}
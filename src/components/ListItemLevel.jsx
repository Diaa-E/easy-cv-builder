import styles from "../styles/ListItem.module.css";
import appIcons from "../data/appIconsBarrel";

import ItemButton from "./ItemButton";
import ItemControls from "./ItemControls";
import ProgressBar from "./ProgressBar";
import LevelText from "./LevelText";

//All metered values range from 0 to 100 with increments of 20
export default function ListItemLevel({itemData, levelMode, textLevels, toggleHide, toggleEdit, deleteItem, moveItemUp})
{
    return (
        <li
            aria-label={`${itemData.name} (${itemData.hidden ? "hidden" : "visible"})`}
            className={itemData.hidden ? styles["list-item-hidden"] : styles["list-item"]}
        >
            <ItemButton
                onClick={() => deleteItem(itemData.id)}
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
                moveItemUp={() => moveItemUp(itemData.id)}
                toggleEdit={() => toggleEdit(itemData.id)} 
                toggleHide={() => toggleHide(itemData.id)}
                hidden={itemData.hidden}
            />
        </li>
    )
}
import "../styles/ListItem.css";
import appIcons from "../data/appIconsBarrel";

import ItemButton from "./ItemButton";
import ItemControls from "./ItemControls";
import ProgressBar from "./ProgressBar";

//All metered values range from 0 to 100 with increments of 20
export default function ListItemLevel({itemData, toggleHide, toggleEdit, deleteItem, moveItemUp})
{
    return (
        <div className={itemData.hidden ? "list-item-hidden" : "list-item"}>
            <ItemButton onClick={() => deleteItem(itemData.id)} text="delete item" imgPath={appIcons.delete} colorClass="item-button-danger"/>
            <div className="item-details item-details-column">
                <p>{itemData.name}</p>
                {itemData.showLevel? <ProgressBar level={itemData.level} disabled={itemData.hidden} label={itemData.name}/> : <></>}
            </div>
            <ItemControls 
                moveItemUp={() => moveItemUp(itemData.id)}
                toggleEdit={() => toggleEdit(itemData.id)} 
                toggleHide={() => toggleHide(itemData.id)}
                hidden={itemData.hidden}
            />
        </div>
    )
}
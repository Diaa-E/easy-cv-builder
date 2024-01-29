import "../styles/ListItem.css";
import appIcons from "../appIconsBarrel";

import ItemButton from "./ItemButton";

//All metered values range from 0 to 100 with increments of 20
export default function ListItemLevel({text, meterValue, showLevel, hidden = false, id, toggleHide, toggleEdit, deleteItem})
{
    return (
        <div className={hidden ? "list-item-hidden" : "list-item"}>
            <ItemButton onClick={() => deleteItem(id)} text="edit item" imgPath={appIcons.delete} colorClass="item-button-danger"/>
            <div className="item-details item-details-column">
                <p>{text}</p>
                {showLevel? <progress className="level-bar" max={100} value={meterValue}></progress> : <></>}
            </div>
            <ItemButton onClick={() => toggleEdit(id)} text="edit item" imgPath={appIcons.edit}/>
            <ItemButton onClick={() => toggleHide(id)} text="toggle visibility" imgPath={hidden ? appIcons.hidden : appIcons.visible}/>
        </div>
    )
}
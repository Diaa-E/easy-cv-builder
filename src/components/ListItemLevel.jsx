import "../styles/ListItem.css";
import appIcons from "../appIconsBarrel";

import ItemButton from "./ItemButton";
import ItemControls from "./ItemControls";
import ProgressBar from "./ProgressBar";

//All metered values range from 0 to 100 with increments of 20
export default function ListItemLevel({text, meterValue, showLevel, hidden = false, id, toggleHide, toggleEdit, deleteItem, moveItemUp})
{
    return (
        <div className={hidden ? "list-item-hidden" : "list-item"}>
            <ItemButton onClick={() => deleteItem(id)} text="delete item" imgPath={appIcons.delete} colorClass="item-button-danger"/>
            <div className="item-details item-details-column">
                <p>{text}</p>
                {showLevel? <ProgressBar level={meterValue} disabled={hidden} label={text}/> : <></>}
            </div>
            <ItemControls 
                moveItemUp={() => moveItemUp(id)}
                toggleEdit={() => toggleEdit(id)} 
                toggleHide={() => toggleHide(id)}
                hidden={hidden}
            />
        </div>
    )
}
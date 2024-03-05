import "../styles/ListItem.css";
import appIcons from "../data/appIconsBarrel";

import ItemButton from "./ItemButton";
import ItemControls from "./ItemControls";

export default function ListItemIcon({iconPath, text, hidden = false, id, toggleHide, toggleEdit, deleteItem, moveItemUp})
{
    return (
        <div className={hidden ? "list-item-hidden" : "list-item"}>
            <ItemButton onClick={() => deleteItem(id)} text="delete item" imgPath={appIcons.delete} colorClass="item-button-danger"/>
            <div className="item-details item-details-row">
                <img className="item-icon" src={iconPath} alt="item icon" />
                <p>{text}</p>
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
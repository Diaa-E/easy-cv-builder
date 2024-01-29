import "../styles/ListItem.css";
import appIcons from "../appIconsBarrel";

import ItemButton from "./ItemButton";

export default function ListItemText({firstLine, secondLine, hidden = false, id, toggleHide, toggleEdit, deleteItem})
{
    return (
        <div className={hidden ? "list-item-hidden" : "list-item"}>
            <ItemButton onClick={() => deleteItem(id)} text="edit item" imgPath={appIcons.delete} colorClass="item-button-danger"/>
            <div className="item-details item-details-column">
                <p>{firstLine}</p>
                <p>{secondLine}</p>
            </div>
            <ItemButton onClick={() => toggleEdit(id)} text="edit item" imgPath={appIcons.edit}/>
            <ItemButton onClick={() => toggleHide(id)} text="toggle visibility" imgPath={hidden ? appIcons.hidden : appIcons.visible}/>
        </div>
    )
}
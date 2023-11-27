import "../styles/ListItem.css";
import hiddenIcon from "../assets/images/hidden.svg";
import visibleIcon from "../assets/images/visible.svg";
import editIcon from "../assets/images/edit.svg";

import ItemButton from "./ItemButton";

export default function ListItemIcon({iconPath, text, hidden = false, id, toggleHide, toggleEdit})
{
    return (
        <div className={hidden ? "list-item-hidden" : "list-item"}>
            <div className="item-details item-details-row">
                <img className="item-icon" src={iconPath} alt="item icon" />
                <p>{text}</p>
            </div>
            <ItemButton onClick={() => toggleEdit(id)} text="edit item" imgPath={editIcon}/>
            <ItemButton onClick={() => toggleHide(id)} text="toggle visibility" imgPath={hidden ? hiddenIcon : visibleIcon}/>
        </div>
    )
}
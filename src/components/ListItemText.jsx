import "../styles/ListItemText.css";
import hiddenIcon from "../assets/images/hidden.svg";
import visibleIcon from "../assets/images/visible.svg";
import editIcon from "../assets/images/edit.svg";

import ItemButton from "./ItemButton";

export default function ListItemText({firstLine, secondLine, hidden = false, id, toggleHide, toggleEdit})
{
    return (
        <div className={hidden ? "list-item-text-hidden" : "list-item-text"}>
            <div className="item-details">
                <p>{firstLine}</p>
                <p>{secondLine}</p>
            </div>
            <ItemButton onClick={() => toggleEdit(id)} text="edit item" imgPath={editIcon}/>
            <ItemButton onClick={() => toggleHide(id)} text="toggle visibility" imgPath={hidden ? hiddenIcon : visibleIcon}/>
        </div>
    )
}
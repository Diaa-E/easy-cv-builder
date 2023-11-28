import "../styles/ListItem.css";
import hiddenIcon from "../assets/images/hidden.svg";
import visibleIcon from "../assets/images/visible.svg";
import editIcon from "../assets/images/edit.svg";

import ItemButton from "./ItemButton";

//All metered values range from 0 to 100 with increments of 20
export default function ListItemLevel({text, meterValue, showLevel, hidden = false, id, toggleHide, toggleEdit})
{
    return (
        <div className={hidden ? "list-item-hidden" : "list-item"}>
            <div className="item-details item-details-column">
                <p>{text}</p>
                {showLevel? <progress className="level-bar" max={100} value={meterValue}></progress> : <></>}
            </div>
            <ItemButton onClick={() => toggleEdit(id)} text="edit item" imgPath={editIcon}/>
            <ItemButton onClick={() => toggleHide(id)} text="toggle visibility" imgPath={hidden ? hiddenIcon : visibleIcon}/>
        </div>
    )
}
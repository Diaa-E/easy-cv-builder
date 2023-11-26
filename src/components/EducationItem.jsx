import "../styles/EducationItem.css";
import hiddenIcon from "../assets/images/hidden.svg";
import visibleIcon from "../assets/images/visible.svg";
import editIcon from "../assets/images/edit.svg";

import ItemButton from "./ItemButton";

export default function EducationItem({degree, school, hidden = false, id, toggleHide, toggleEdit})
{
    return (
        <div className={hidden ? "education-item-hidden" : "education-item"}>
            <div className="item-details">
                <p>{degree}</p>
                <p>{school}</p>
            </div>
            <ItemButton onClick={() => toggleEdit(id)} text="edit item" imgPath={editIcon}/>
            <ItemButton onClick={() => toggleHide(id)} text="toggle visibility" imgPath={hidden ? hiddenIcon : visibleIcon}/>
        </div>
    )
}
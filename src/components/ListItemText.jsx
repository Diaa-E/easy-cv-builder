import "../styles/ListItem.css";
import appIcons from "../data/appIconsBarrel";

import ItemButton from "./ItemButton";
import ItemControls from "./ItemControls";

export default function ListItemText({title, firstLine, secondLine, hidden = false, id, toggleHide, toggleEdit, deleteItem, moveItemUp})
{
    return (
        <li
            aria-label={`${title} (${hidden ? "hidden" : "visible"})`}
            className={hidden ? "list-item-hidden" : "list-item"}
        >
            <ItemButton
                onClick={() => deleteItem(id)}
                text="delete item"
                imgPath={appIcons.delete}
                danger={true}
            />
            <div className="item-details item-details-column">
                <p>{firstLine}</p>
                <p>{secondLine}</p>
            </div>
            <ItemControls 
                moveItemUp={() => moveItemUp(id)}
                toggleEdit={() => toggleEdit(id)} 
                toggleHide={() => toggleHide(id)}
                hidden={hidden}
            />
        </li>
    )
}
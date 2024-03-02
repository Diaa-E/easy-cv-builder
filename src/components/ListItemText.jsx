import "../styles/ListItem.css";
import appIcons from "../appIconsBarrel";

import ItemButton from "./ItemButton";
import ItemControls from "./ItemControls";
import { useContext } from "react";

export default function ListItemText({firstLine, secondLine, hidden = false, id, toggleHide, toggleEdit, deleteItem, moveItemUp})
{
    const dialogSetter = useContext(DialogContext);

    return (
        <div className={hidden ? "list-item-hidden" : "list-item"}>
            <ItemButton onClick={() => deleteItem(id)} text="delete item" imgPath={appIcons.delete} colorClass="item-button-danger"/>
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
        </div>
    )
}
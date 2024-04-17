import { useContext} from "react";
import appIcons from "../data/appIconsBarrel";
import ItemButton from "./ItemButton";
import { ScreenWidthContext } from "../App";
import MobileItemControls from "./MobileItemControls";

export default function ItemControls({toggleEdit, toggleHide, moveItemUp, hidden})
{
    const screenWidth = useContext(ScreenWidthContext).screenWidth;
    
    if (screenWidth <= 700)
    {
        return (
            <MobileItemControls 
                hidden={hidden}
                moveItemUp={moveItemUp}
                toggleEdit={toggleEdit}
                toggleHide={toggleHide}
            /> 
        )
    }

    return (
        <>
            <ItemButton onClick={toggleEdit} text="edit item" imgPath={appIcons.edit}/>
            <ItemButton onClick={toggleHide} text={hidden ? "show item" : "hide item"} imgPath={hidden ? appIcons.hidden : appIcons.visible}/>
            <ItemButton onClick={moveItemUp} text="move item up" colorClass="item-button-blue" imgPath={appIcons.moveUp}/>
        </>
    )
}
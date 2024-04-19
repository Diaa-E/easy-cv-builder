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
            <ItemButton
                onClick={toggleEdit}
                text="edit"
                imgPath={appIcons.edit}
            />
            <ItemButton
                onClick={toggleHide}
                text={hidden ? "show" : "hide"}
                imgPath={hidden ? appIcons.hidden : appIcons.visible}
            />
            <ItemButton
                onClick={moveItemUp}
                text="move up"
                imgPath={appIcons.moveUp}
            />
        </>
    )
}
import { useContext} from "react";
import appIcons from "../data/appIconsBarrel";
import ItemButton from "./ItemButton";
import { ScreenWidthContext } from "../App";
import MobileItemControls from "./MobileItemControls";

export default function ItemControls({toggleEdit, toggleHide, moveItemUp, hidden, firstItem})
{
    const screenWidth = useContext(ScreenWidthContext).screenWidth;
    
    if (screenWidth <= 700)
    {
        return (
            <MobileItemControls 
                firstItem={firstItem}
                hidden={hidden}
                moveItemUp={moveItemUp}
                toggleEdit={toggleEdit}
                toggleHide={toggleHide}
            /> 
        )
    }

    return (
        <>
            {
                !firstItem &&
                <ItemButton
                    onClick={moveItemUp}
                    text="move up"
                    imgPath={appIcons.moveUp}
                />
            }
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
        </>
    )
}
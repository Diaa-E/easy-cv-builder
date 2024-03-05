import { useContext, useState } from "react";
import appIcons from "../appIconsBarrel";
import ItemButton from "./ItemButton";
import { ScreenWidthContext } from "../App";

export default function ItemControls({toggleEdit, toggleHide, moveItemUp, hidden})
{
    const screenWidth = useContext(ScreenWidthContext).screenWidth;

    const [open, setOpen] = useState(false);
    const [cursorPosition, setCursorPosition] = useState([0, 0]);
    
    if (screenWidth <= 700)
    {
        window.addEventListener("scroll", () => {

            setOpen(false);
        });
        
        return (
            <>
                <ItemButton
                    onClick={(e) => {
                        setOpen(true);
                        setCursorPosition([screenWidth - e.clientX, e.clientY])}
                    } 
                    text={"more options"} 
                    imgPath={appIcons.more}
                />
                {
                    !open? <></>
                    : <div onClick={() => setOpen(false)} className="item-menu-overlay">
                        <div className="item-menu"  style={{right: cursorPosition[0], top: cursorPosition[1]}}>
                            <button onClick={() => {toggleEdit(); setOpen(false);}} className="item-menu-button">Edit</button>
                            <button onClick={() => {toggleHide(); setOpen(false);}} className="item-menu-button">{hidden? "Show" : "Hide"}</button>
                            <button onClick={() => {moveItemUp(); setOpen(false);}} className="item-menu-button">Move up</button>
                        </div>
                    </div>
                }
            </>
        )
    }

    return (
        <>
            <ItemButton onClick={toggleEdit} text="edit item" imgPath={appIcons.edit}/>
            <ItemButton onClick={toggleHide} text="toggle visibility" imgPath={hidden ? appIcons.hidden : appIcons.visible}/>
            <ItemButton onClick={moveItemUp} text="move item up" colorClass="item-button-blue" imgPath={appIcons.moveUp}/>
        </>
    )
}
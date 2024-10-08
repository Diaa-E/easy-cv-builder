import appIcons from "../data/appIconsBarrel";
import ItemButton from "./ItemButton";
import MobileItemControls from "./MobileItemControls";
import styles from "../styles/ListItem.module.css";
import useScreenWidth from "../hooks/useScreenWidth";

export default function ItemControls({toggleEdit, toggleHide, moveItemUp, hidden, firstItem, itemTitle})
{
    const screenWidth = useScreenWidth();
    
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
        <div className={styles["item-controls"]}>
            {
                !firstItem &&
                <ItemButton
                    onClick={moveItemUp}
                    text={`move ${itemTitle} up`}
                    imgPath={appIcons.moveUp}
                />
            }
            <ItemButton
                onClick={toggleEdit}
                text={"edit" + itemTitle}
                imgPath={appIcons.edit}
            />
            <ItemButton
                onClick={toggleHide}
                text={(hidden ? "show" : "hide") + itemTitle}
                imgPath={hidden ? appIcons.hidden : appIcons.visible}
            />
        </div>
    )
}
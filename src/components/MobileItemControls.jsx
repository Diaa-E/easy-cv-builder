import { useState } from "react";
import appIcons from "../data/appIconsBarrel";
import ItemButton from "./ItemButton";
import styles from "../styles/MobileItemControls.module.css";
import useScreenWidth from "../hooks/useScreenWidth";
import useToggleScroll from "../hooks/useToggleScroll";

export default function MobileItemControls({ toggleEdit, toggleHide, moveItemUp, hidden, firstItem }) {

    const screenWidth = useScreenWidth();
    const [open, setOpen] = useState(false);
    const [cursorPosition, setCursorPosition] = useState([0, 0]);

    useToggleScroll(open);

    return (
        <>
            <ItemButton
                onClick={(e) => {
                    setOpen(true);
                    setCursorPosition([screenWidth - e.clientX, e.clientY]);
                }}
                text={"more options"}
                imgPath={appIcons.more}
            />
            {
                open &&
                <div onClick={() => setOpen(false)} id="item-menu-overlay" className={styles["item-menu-overlay"]}>
                    <div
                        role="menu"
                        aria-label="item controls menu"
                        onClick={e => e.stopPropagation()}
                        className={styles["item-menu"]}
                        style={{ right: cursorPosition[0], top: cursorPosition[1] }}
                    >
                        <ItemButton
                            imgPath={appIcons.clear}
                            text={"close menu"}
                            onClick={() => setOpen(false)}
                            toolTip="Close menu"
                        />
                        <button
                            onClick={() => {
                                toggleEdit();
                                setOpen(false);
                            }}
                            className={styles["item-menu-button"]}
                        >Edit</button>
                        
                        <button
                            onClick={() => {
                                toggleHide();
                                setOpen(false);
                            }}
                            className={styles["item-menu-button"]}
                        >{hidden ? "Show" : "Hide"}</button>

                        {
                            !firstItem &&
                            <button
                            onClick={() => {
                                moveItemUp();
                                setOpen(false);
                            }}
                            className={styles["item-menu-button"]}
                            >
                                Move up
                            </button>
                        }
                    </div>
                </div>
            }
        </>
    )
}
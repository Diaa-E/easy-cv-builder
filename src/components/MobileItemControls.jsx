import { useEffect, useContext, useState, useRef } from "react";
import { ScreenWidthContext } from "../App";
import appIcons from "../data/appIconsBarrel";
import ItemButton from "./ItemButton";

import styles from "../styles/MobileItemControls.module.css";

export default function MobileItemControls({ toggleEdit, toggleHide, moveItemUp, hidden, firstItem }) {
    const screenWidth = useContext(ScreenWidthContext).screenWidth;
    const [open, setOpen] = useState(false);
    const cursorPositionRef = useRef([0, 0]);

    useEffect(() => {

        window.addEventListener("scroll", () => {

            setOpen(false);
        });

        return () => window.removeEventListener("scroll", window);

    }, [])

    return (
        <>
            <ItemButton
                onClick={(e) => {
                    setOpen(true);
                    cursorPositionRef.current = [screenWidth - e.clientX, e.clientY]
                }
                }
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
                        style={{ right: cursorPositionRef.current[0], top: cursorPositionRef.current[1] }}
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
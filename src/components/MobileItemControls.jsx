import { useEffect, useState, useRef } from "react";
import appIcons from "../data/appIconsBarrel";
import ItemButton from "./ItemButton";
import styles from "../styles/MobileItemControls.module.css";
import useScreenWidth from "../hooks/useScreenWidth";

export default function MobileItemControls({ toggleEdit, toggleHide, moveItemUp, hidden, firstItem }) {

    const screenWidth = useScreenWidth();
    const [open, setOpen] = useState(false);
    const cursorPositionRef = useRef([0, 0]);

    useEffect(() => {

        function handleScroll()
        {
            setOpen(false);
        }

        window.addEventListener("scroll", handleScroll);

        return () => {

            window.removeEventListener("scroll", handleScroll);
        };

    }, []);

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
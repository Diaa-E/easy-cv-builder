import styles from "../styles/DarkModeButton.module.css";
import appIcons from "../data/appIconsBarrel";

export default function DarkModeButton({darkMode, onClick})
{
    return (
        <button
            aria-label={`use ${darkMode ? "light" : "dark"} theme`}
            title={`Use ${darkMode ? "light" : "dark"} theme`}
            onClick={onClick}
            className={styles[`dark-mode-button`]}
        >
            <img
                aria-hidden
                className={[
                    styles["dark-mode-icon"],
                    styles["yellow"],
                    darkMode ? styles["inactive"] : styles["active"]
                ].join(" ")}
                src={appIcons.light}
                alt="dark mode button"
            />
            <img
                aria-hidden
                className={[
                    styles["dark-mode-icon"],
                    styles["blue"],
                    darkMode ? styles["active"] : styles["inactive"]
                ].join(" ")}
                src={appIcons.dark}
                alt="dark mode button"
            />
        </button>
    )
}
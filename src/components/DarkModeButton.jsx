import "../styles/DarkModeButton.css";
import appIcons from "../data/appIconsBarrel";

export default function DarkModeButton({darkMode, onClick})
{
    return (
        <button
            aria-label={`use ${darkMode ? "light" : "dark"} theme`}
            title={`Use ${darkMode ? "light" : "dark"} theme`}
            onClick={onClick}
            className={`dark-mode-button`}
        >
            <img
                aria-hidden
                className={`dark-mode-icon yellow ${darkMode ? "inactive" : "active"}`}
                src={appIcons.light}
                alt="dark mode button"
            />
            <img
                aria-hidden
                className={`dark-mode-icon blue ${darkMode ? "active" : "inactive"}`}
                src={appIcons.dark}
                alt="dark mode button"
            />
        </button>
    )
}
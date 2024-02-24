import "../styles/DarkModeButton.css";
import appIcons from "../appIconsBarrel";

export default function DarkModeButton({darkMode, onClick})
{
    return (
        <button onClick={onClick} className={`dark-mode-button`}>
            <img
                className={`dark-mode-icon yellow ${darkMode ? "active" : "inactive"}`}
                src={appIcons.light}
                alt="dark mode button"
            />
            <img
                className={`dark-mode-icon blue ${darkMode ? "inactive" : "active"}`}
                src={appIcons.dark}
                alt="dark mode button"
            />
        </button>
    )
}
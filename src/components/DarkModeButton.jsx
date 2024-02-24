import "../styles/DarkModeButton.css";
import appIcons from "../appIconsBarrel";

export default function DarkModeButton({darkMode, onClick})
{
    return (
        <button onClick={onClick} className={`dark-mode-button ${darkMode ? "yellow" : "blue"}`}>
            <img
                className={`dark-mode-icon ${darkMode ? "yellow" : "blue"}`}
                src={darkMode ? appIcons.light : appIcons.dark}
                alt="dark mode button"
            />
        </button>
    )
}
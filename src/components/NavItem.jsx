import "../styles/NavItem.css";

export default function NavItem({iconUrl, title, selected = false, onClick = () => {}})
{
    return (
        <li>
            <button
                aria-label={`go to ${title}`}
                title={title}
                className={`nav-item ${selected? "selected" : ""}`}
                onClick={onClick}
            >
                <img aria-hidden src={iconUrl} alt={`${title} tab icon`} />
            </button>
        </li>
    )
}
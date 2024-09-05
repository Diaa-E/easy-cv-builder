import styles from "../styles/NavItem.module.css";

export default function NavItem({iconUrl, title, selected = false, onClick = () => {}})
{
    return (
        <li>
            <button
                aria-label={`go to ${title}`}
                title={title}
                className={`${styles["nav-item"]} ${selected? styles["selected"] : ""}`}
                onClick={onClick}
            >
                <img aria-hidden src={iconUrl} alt={`${title} tab icon`} />
            </button>
        </li>
    )
}
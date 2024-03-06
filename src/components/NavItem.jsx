import "../styles/NavItem.css";

export default function NavItem({iconUrl, title, selected = false, onClick = () => {}})
{
    return (
        <>
            <button title={title} className={`nav-item ${selected? "selected" : ""}`} onClick={onClick}>
                <img src={iconUrl} alt={`${title} tab icon`} />
            </button>
        </>
    )
}
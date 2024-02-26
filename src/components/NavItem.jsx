import "../styles/NavItem.css";

export default function NavItem({iconUrl, title, id, selected = false, onClick = () => {}})
{
    return (
        <>
            <button title={title} className={`nav-item ${selected? "selected" : ""}`} onClick={() => onClick(id)}>
                <img src={iconUrl} alt={`${title} tab icon`} />
            </button>
        </>
    )
}
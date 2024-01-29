import "../styles/NavItem.css";

export default function NavItem({iconUrl, id, selected = false, onClick = () => {}})
{
    return (
        <>
            <button className={`nav-item ${selected? "selected" : ""}`} onClick={() => onClick(id)}>
                <img src={iconUrl} alt={`Icon for ${id} tab`} />
            </button>
        </>
    )
}
import "../styles/ItemButton.css";

export default function ItemButton({colorClass = "", imgPath, text, onClick = () => {}})
{
    return (
        <button onClick={onClick} className={`item-button ${colorClass}`}>
            <img src={imgPath} alt={`${text} button icon`} />
        </button>
    )
}
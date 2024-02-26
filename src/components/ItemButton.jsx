import "../styles/ItemButton.css";

export default function ItemButton({colorClass = "", imgPath, text, onClick = () => {}, toolTip = `${text}`})
{
    return (
        <button title={toolTip} onClick={onClick} className={`item-button ${colorClass}`}>
            <img src={imgPath} alt={`${text} button icon`} />
        </button>
    )
}
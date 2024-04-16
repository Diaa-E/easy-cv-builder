import "../styles/ItemButton.css";

export default function ItemButton({colorClass = "", imgPath, text, onClick = () => {}, toolTip = `${text}`})
{
    return (
        <button aria-label={text} title={toolTip} onClick={onClick} className={`item-button ${colorClass}`}>
            <img aria-hidden src={imgPath} alt={`${toolTip} button icon`} />
        </button>
    )
}
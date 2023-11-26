import "../styles/ItemButton.css";

export default function ItemButton({imgPath, text, onClick = () => {}})
{
    return (
        <button onClick={onClick} className="item-button">
            <img src={imgPath} alt={`${text} button icon`} />
        </button>
    )
}
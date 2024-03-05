import "../styles/AddButton.css";
import appIcons from "../data/appIconsBarrel";

export default function AddButton({onclick = () => {}})
{
    return (
        <>
            <button title="Add a new item" onClick={onclick} className="add-button">
                <img src={appIcons.add} alt="add a new item icon" />
            </button>
        </>
    )
}
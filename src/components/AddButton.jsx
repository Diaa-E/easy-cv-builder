import "../styles/AddButton.css";
import appIcons from "../appIconsBarrel";

export default function AddButton({onclick = () => {}})
{
    return (
        <>
            <button onClick={onclick} className="add-button">
                <img src={appIcons.add} alt="add a new item icon" />
            </button>
        </>
    )
}
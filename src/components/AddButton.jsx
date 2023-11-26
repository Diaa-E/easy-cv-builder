import "../styles/AddButton.css";
import addIcon from "../assets/images/add.svg";

export default function AddButton({onclick = () => {}})
{
    return (
        <>
            <button onClick={onclick} className="add-button">
                <img src={addIcon} alt="add a new item icon" />
            </button>
        </>
    )
}
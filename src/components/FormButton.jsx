import styles from "../styles/FormButton.module.css";

export default function FormButton({text = "Click", onClick = () => {}, classes = [], toolTip = `${text} button`})
{
    return (
        <>
            <button title={toolTip} className={classes.join(" ")} onClick={onClick}>
                {text}
            </button>
        </>
    )
}
import styles from "../styles/FormButton.module.css";

export default function FormButton({text = "Click", onClick = () => {}, style = "secondary", toolTip = `${text} button`})
{
    return (
        <>
            <button
                title={toolTip}
                className={[styles["form-button"], styles[style]].join(" ")}
                onClick={onClick}
            >
                {text}
            </button>
        </>
    )
}
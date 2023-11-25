import "../styles/FormButton.css";

export default function FormButton({text = "Click", onClick = () => {}, classes = []})
{
    return (
        <>
            <button className={classes.join(" ")} onClick={onClick}>
                {text}
            </button>
        </>
    )
}
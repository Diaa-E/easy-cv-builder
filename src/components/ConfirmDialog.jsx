import useUnmountDelay from "../hooks/useUnmountDelay";
import styles from "../styles/ConfirmDialog.module.css";
import { highlightText } from "../utils/highlightText";
import FormButton from "./FormButton";
import { v4 as generateId } from "uuid";

export default function ConfirmDialog({prompt, actionText, danger, onConfirm, onCancel = () => {}})
{

    const [mounted, mount, unmount] = useUnmountDelay(300);

    return (
        <div
            className={`${styles["backdrop"]} ${mounted ? styles["open"] : styles["close"]}`}
            id="dialog-backdrop"
            onClick={() => unmount(onCancel)}
        >
            <div
                aria-label="confirm action"
                aria-describedby="prompt"
                role="dialog"
                className={`${styles["dialog-box"]} ${mounted ? styles["open"] : styles["close"]}`}
                onClick={e => {
                    e.stopPropagation();
                }} 
            >
                <p id="prompt" className={styles["prompt"]}>
                {
                    highlightText(prompt, "*").map(segment => {

                      if (segment.highlight) return <span key={generateId()} className={styles["red-highlight"]}>{segment.value}</span>  

                      return segment.value
                    })
                }
                </p>
                <FormButton
                    style="secondary"
                    onClick={e => {
                        e.stopPropagation();
                        unmount(onCancel);
                    }}
                    text="Cancel"
                    toolTip="Cancel action"/>
                <FormButton
                    style={danger ? "danger" : "primary"}
                    onClick={e => {
                        e.stopPropagation();
                        unmount(onConfirm);
                    }}
                    text={actionText}
                    toolTip="Confirm action"/>
            </div>
        </div>
    )
}
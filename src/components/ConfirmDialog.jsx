import styles from "../styles/ConfirmDialog.module.css";
import { highlightText } from "../utils/highlightText";
import FormButton from "./FormButton";
import { v4 as generateId } from "uuid";

export default function ConfirmDialog({prompt, actionText, danger, onConfirm, onCancel = () => {}})
{
    return (
        <div
            className={styles["backdrop"]}
            id="dialog-backdrop"
            onClick={onCancel}
        >
            <div
                aria-label="confirm action"
                aria-describedby="prompt"
                role="dialog"
                className={styles["dialog-box"]}
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
                        onCancel();
                    }}
                    text="Cancel"
                    toolTip="Cancel action"/>
                <FormButton
                    style={danger ? "danger" : "primary"}
                    onClick={e => {
                        e.stopPropagation();
                        onConfirm();
                    }}
                    text={actionText}
                    toolTip="Confirm action"/>
            </div>
        </div>
    )
}
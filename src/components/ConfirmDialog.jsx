import "../styles/ConfirmDialog.css";
import { highlightText } from "../utils/highlightText";
import FormButton from "./FormButton";
import { v4 as generateId } from "uuid";

export default function ConfirmDialog({prompt, actionText, onConfirm, onCancel})
{
    return (
        <div
            onClick={e => {
                e.stopPropagation();
                onCancel();
            }} 
            className="backdrop"
            data-testid="backdrop"
        >
            <div role="dialog" className="dialog-box">
                <p className="prompt">
                {
                    highlightText(prompt, "*").map(segment => {

                      if (segment.highlight) return <span key={generateId()} className="red-highlight">{segment.value}</span>  

                      return segment.value
                    })
                }
                </p>
                <FormButton
                    classes={["form-button", "white-button"]}
                    onClick={e => {
                        e.stopPropagation();
                        onCancel();
                    }}
                    text="Cancel"
                    toolTip="Cancel action"/>
                <FormButton
                    classes={["form-button", "red-button"]}
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
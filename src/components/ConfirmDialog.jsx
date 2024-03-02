import "../styles/ConfirmDialog.css";
import FormButton from "./FormButton";

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
                <p className="prompt">{prompt}</p>
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
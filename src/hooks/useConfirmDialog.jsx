import ConfirmDialog from "../components/ConfirmDialog";
import reduceDialog from "../utils/dialogReducer";
import { useReducer } from "react";

export default function useConfirmDialog()
{
    const [dialogState, dispatchDialog] = useReducer(reduceDialog, null, () => {
        return {
            open: false,
            actionText: "",
            prompt: "",
            danger: false,
            onConfirm: () => {},
        }
    });

    return [
        dialogState,
        dispatchDialog,
        <ConfirmDialog 
            actionText={dialogState.actionText}
            danger={dialogState.danger}
            onConfirm={() => {
                dialogState.onConfirm();
                dispatchDialog({ type: "close" });
            }}
            prompt={dialogState.prompt}
            onCancel={() => dispatchDialog({ type: "close" })}
        />
    ];
}
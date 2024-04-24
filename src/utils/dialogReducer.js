export default function reduceDialog(dialogState, action)
{
    switch (action.type)
    {
        case "openDefault": return {
            open: true,
            actionText: action.actionText,
            prompt: action.prompt,
            danger: false,
            onConfirm: action.onConfirm,
        };
        case "openDanger": return {
            open: true,
            actionText: action.actionText,
            prompt: action.prompt,
            danger: true,
            onConfirm: action.onConfirm,
        };
        case "close": return {
            open: false,
            actionText: "",
            prompt: "",
            danger: false,
            onConfirm: () => {},
        };
        default: throw new Error("Invalid action type: " + action.type);
    }
}
import { deleteItem, moveItemUp, toggleHide, updateItems, toggleHideSection } from "./arrayFunctions";
import { isEmptySection } from "./emptySectionDetector";

export default function reduceList(list, action)
{
    switch (action.type)
    {
        case "toggleHideItem": return [
            ...toggleHide(action.itemId, list)
        ];
        case "toggleHideAll": return [
            ...toggleHideSection(list, !isEmptySection(list))
        ];
        case "moveUp": return [
            ...moveItemUp(action.itemId, list)
        ];
        case "deleteItem": return [
            ...deleteItem(action.itemId, list)
        ];
        case "deleteAll": return [];
        case "updateList": return [
            ...updateItems(action.newItem, list)
        ];
        case "reset": return [
            ...action.defaultList
        ];
        default: throw new Error ("Invalid action type: " + action.type);
    }
}
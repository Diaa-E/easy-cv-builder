import { useState } from "react";
import ListItemLevel from "../components/ListItemLevel";
import AddButton from "../components/AddButton";
import TextInput from "../components/TextInput";
import FormButton from "../components/FormButton";
import RangeInput from "../components/RangeInput";
import { v4  as generateId} from "uuid";
import { getItemIndex } from "../utils/utility";
import { deleteItem, moveItemUp, toggleHide, updateItems } from "../utils/arrayFunctions";
import appIcons from "../data/appIconsBarrel";
import ToggleAllButton from "../components/ToggleAllButton";
import { isEmptySection } from "../utils/emptySectionDetector";
import { toggleHideSection } from "../utils/toggleHideSection";
import { languageLevels } from "../data/textLevelTemplates";

export default function Languages({languagesItems, setLanguagesItems, setDialogState, emptyText, levelMode})
{
    const [editMode, setEditMode] = useState(false);
    const [currentItem, setCurrentItem] = useState({});

    if (editMode)
    {
        return (
            <div className="items-container">
                <h2 className="edit-title">{`${getItemIndex(languagesItems, currentItem.id) > -1 ? "Edit" : "Add"} Language`}</h2>
                <TextInput
                    text={currentItem.name}
                    labelText="Language"
                    onChange={(e) => {setCurrentItem({...currentItem, name: e.target.value})}}
                    clearField={() => {setCurrentItem({...currentItem, name: ""})}}
                    placeholder="language"
                    id="language"
                />
                <RangeInput
                    value={currentItem.level}
                    labelText={"Level"}
                    checked={currentItem.showLevel}
                    onRangeChange={(e) => setCurrentItem({...currentItem, level: e.target.value < 20? 20 : e.target.value})}
                    onCheckedChange={(e) => setCurrentItem({...currentItem, showLevel: e.target.checked})}
                    id="level"
                />
                <div className="edit-controls">
                    <FormButton
                        text='Cancel'
                        classes={["form-button", "white-button"]}
                        onClick={() => {setEditMode(false)}}
                    />
                    <FormButton
                        text={getItemIndex(languagesItems, currentItem.id) > -1 ? "Save" : "Add"}
                        classes={["form-button", "blue-button"]}
                        onClick={() => {
                            setEditMode(false);
                            setLanguagesItems(updateItems(currentItem, languagesItems));
                        }}
                    />
                </div>
            </div>
        )
    }

    return (
        <div className="items-container">
        {
            languagesItems.length === 0 &&
            <h2 className="empty-list-text">{emptyText}</h2>
        }
        {
            languagesItems.length !== 0 &&
            <div className="list-controls">
                <ToggleAllButton
                    icon={appIcons.delete}
                    toolTip={"Delete all language items"}
                    colorClasses={["toggle-all-button-red"]}
                    onClick={() => setDialogState({
                        open: true,
                        actionText: "Delete All",
                        dangerAction: true,
                        prompt: "Are you sure you want to *premenantly delete all items* the languages section?",
                        onConfirm: () => {
                            setLanguagesItems([]);
                        }
                    })}
                />
                <ToggleAllButton
                    icon={isEmptySection(languagesItems) ? appIcons.hidden : appIcons.visible}
                    toolTip={"Hide all language items"}
                    colorClasses={["toggle-all-button-white"]}
                    onClick={() => setLanguagesItems(toggleHideSection(languagesItems, !isEmptySection(languagesItems)))}
                />
            </div>
        }
        {
            languagesItems.map(item => {
            return <ListItemLevel
                        textLevels={languageLevels}
                        levelMode={levelMode}
                        itemData={item}
                        key={item.id}
                        toggleHide={(id) => setLanguagesItems(toggleHide(id, languagesItems))}
                        toggleEdit={(id) => {
                            setEditMode(true);
                            setCurrentItem(languagesItems[getItemIndex(languagesItems, id)]);
                        }}
                        deleteItem={(id) => {
                            setDialogState({
                                open: true,
                                actionText: "Delete",
                                dangerAction: true,
                                prompt: "Are you sure you want to *premenantly delete* this item from the languages section?",
                                onConfirm: () => {
                                    setLanguagesItems(deleteItem(id, languagesItems));
                                }
                            });
                        }}
                        moveItemUp={(id => setLanguagesItems(moveItemUp(id, languagesItems)))}
                    />
            }) 
        }
        <AddButton onclick={() => {
            setCurrentItem({
                id: generateId(),
                name: "",
                level: 60,
                hidden: false,
                showLevel: true,
            });
            setEditMode(true);
        }}/>
        </div>
    )
}
import { useState } from "react";
import ListItemLevel from "./ListItemLevel";
import AddButton from "./AddButton";
import TextInput from "./TextInput";
import FormButton from "./FormButton";
import RangeInput from "./RangeInput";
import { v4  as generateId} from "uuid";
import { getItemIndex } from "../utility";

export default function Languages({languagetems, enabled = true, toggleHide, updateItems, deleteItem, moveItemUp, emptyText, setDialogState})
{
    const [editMode, setEditMode] = useState(false);
    const [currentItem, setCurrentItem] = useState({});

    if (!enabled)
    {
        return <></>
    }

    if (editMode)
    {
        return (
            <div className="items-container">
                <h2 className="edit-title">{`${getItemIndex(languagetems, currentItem.id) > -1 ? "Edit" : "Add"} Language`}</h2>
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
                        text={getItemIndex(languagetems, currentItem.id) > -1 ? "Save" : "Add"}
                        classes={["form-button", "blue-button"]}
                        onClick={() => {
                            setEditMode(false);
                            updateItems(currentItem);
                        }}
                    />
                </div>
            </div>
        )
    }

    return (
        <div className="items-container">
        {
            languagetems.length === 0 &&
            <h2 className="empty-list-text">{emptyText}</h2>
        }
        {
            languagetems.map(item => {
            return <ListItemLevel
                        text={item.name}
                        meterValue={item.level}
                        showLevel={item.showLevel}
                        hidden={item.hidden}
                        id={item.id}
                        key={item.id}
                        toggleHide={toggleHide}
                        toggleEdit={(id) => {
                            setEditMode(true)
                            setCurrentItem(languagetems.find(item => item.id === id))
                        }}
                        deleteItem={(id) => {
                            setDialogState({
                                open: true,
                                actionText: "Delete",
                                prompt: "Are you sure you want to premenantly delete this item from the languages section??",
                                onConfirm: () => {
                                    deleteItem(id);
                                }
                            });
                        }}
                        moveItemUp={(id => moveItemUp(id))}
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
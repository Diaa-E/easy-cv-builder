import { useState } from "react";
import ListItemLevel from "./ListItemLevel";
import AddButton from "./AddButton";
import TextInput from "./TextInput";
import FormButton from "./FormButton";
import RangeInput from "./RangeInput";

export default function Skills({skillItems, enabled = true, addItem, toggleHide, updateItems, deleteItem, moveItemUp, emptyText})
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
                <h2>Edit Skill</h2>
                <TextInput
                    text={currentItem.name}
                    labelText="Skill"
                    onChange={(e) => {setCurrentItem({...currentItem, name: e.target.value})}}
                    placeholder="skill"
                    id="skill"
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
                        text='Save'
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

    if (skillItems.length === 0)
    {
        return (
            <div className="items-container">
                <h2 className="empty-list-text">{emptyText}</h2>
                <AddButton onclick={addItem}/>
            </div>
        )
    }

    return (
        <div className="items-container">
            {
                skillItems.map(item => {
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
                                    setCurrentItem(skillItems.find(item => item.id === id))
                                }}
                                deleteItem={(id) => {
                                    deleteItem(id);
                                }}
                                moveItemUp={(id) => moveItemUp(id)}
                            />
                })
            }
            <AddButton onclick={addItem}/>
        </div>
    )
}
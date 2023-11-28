import { useState } from "react";
import ListItemLevel from "./ListItemLevel";
import AddButton from "./AddButton";
import TextInput from "./TextInput";
import FormButton from "./FormButton";
import RangeInput from "./RangeInput";

export default function Languages({languagetems, enabled = true, addItem, toggleHide, updateItems, deleteItem})
{
    const [editMode, setEditMode] = useState(false);
    const [currentItem, setCurrentItem] = useState({});

    if (enabled)
    {
        if (editMode)
        {
            return (
                <div className="items-container">
                    <h2>Edit Language</h2>
                    <TextInput
                        text={currentItem.name}
                        labelText="Language"
                        onChange={(e) => {setCurrentItem({...currentItem, name: e.target.value})}}
                        placeholder="language"
                        id="language"
                    />
                    <RangeInput
                        value={currentItem.level}
                        labelText={"Level"}
                        checked={currentItem.showLevel}
                        onTextChange={(e) => setCurrentItem({...currentItem, level: e.target.value < 20? 20 : e.target.value})}
                        onCheckedChange={(e) => setCurrentItem({...currentItem, showLevel: e.target.checked})}
                        id="level"
                    />
                    <div className="edit-controls">
                        <FormButton
                            text='Delete'
                            classes={["form-button", "red-button"]}
                            onClick={() => {
                                setEditMode(false);
                                deleteItem(currentItem);
                            }}
                        />
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
        else
        {
            return (
                <div className="items-container">
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
                                    />
                        })
                    }
                    <AddButton onclick={addItem}/>
                </div>
            )
        }
    }
    else
    {
        return <></>
    }
}
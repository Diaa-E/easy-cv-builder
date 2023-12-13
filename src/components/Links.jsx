import { useState } from "react";
import ListItemIcon from "./ListItemIcon";
import AddButton from "./AddButton";
import TextInput from "./TextInput";
import FormButton from "./FormButton";
import SelectInput from "./SelectInput";
import linkIcons from "../linkIconsBarrel";

export default function Links({linksItems, enabled = true, addItem, toggleHide, updateItems, deleteItem})
{
    const [editMode, setEditMode] = useState(false);
    const [currentItem, setCurrentItem] = useState({});

    if (enabled)
    {
        if (editMode)
        {
            return (
                <div className="items-container">
                    <h2>Edit Link</h2>
                    <SelectInput
                        options={linkIcons}
                        optionNameKey={"name"}
                        optionValueKey={"name"}
                        labelText={"Website"}
                        selected={currentItem.icon}
                        onChange={(e) => setCurrentItem({...currentItem, icon: e.target.value})}
                    />
                    <TextInput
                        text={currentItem.url}
                        labelText="URL"
                        onChange={(e) => setCurrentItem({...currentItem, url: e.target.value})}
                        placeholder="url"
                        id="url"
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
        else
        {
            return (
                <div className="items-container">
                    {
                        linksItems.map(item => {
                            return <ListItemIcon
                                        iconPath={linkIcons.find(icon => item.icon === icon.name).icon}
                                        text={item.url}
                                        hidden={item.hidden}
                                        id={item.id}
                                        key={item.id}
                                        toggleHide={toggleHide}
                                        toggleEdit={(id) => {
                                            setEditMode(true)
                                            setCurrentItem(linksItems.find(item => item.id === id))
                                        }}
                                        deleteItem={(id) => {
                                            setEditMode(false);
                                            deleteItem(id);
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
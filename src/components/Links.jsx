import { useState } from "react";
import ListItemIcon from "./ListItemIcon";
import AddButton from "./AddButton";
import TextInput from "./TextInput";
import FormButton from "./FormButton";
import SelectInput from "./SelectInput";
import linkIcons from "../linkIconsBarrel";
import { v4 as generateId } from "uuid";
import { getItemIndex } from "../utility";

export default function Links({linksItems, enabled = true, toggleHide, updateItems, deleteItem, moveItemUp, emptyText})
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
                <h2 className="edit-title">{`${getItemIndex(linksItems, currentItem.id) > -1 ? "Edit" : "Add"} Link`}</h2>
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

    if (linksItems.length === 0)
    {
        return (
            <div className="items-container">
                <h2 className="empty-list-text">{emptyText}</h2>
                <AddButton onclick={() => {
                    setCurrentItem({
                        id: generateId(),
                        url: "",
                        icon: linkIcons.find(item => item.name === "other").name,
                        hidden: false,
                    });
                    setEditMode(true);
                }}/>
            </div>
        )
    }

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
                                    deleteItem(id);
                                }}
                                moveItemUp={(id) => moveItemUp(id)}
                            />
                })
            }
            <AddButton onclick={() => {
                setCurrentItem({
                    id: generateId(),
                    url: "",
                    icon: linkIcons.find(item => item.name === "other").name,
                    hidden: false,
                });
                setEditMode(true);
            }}/>
        </div>
    )
}
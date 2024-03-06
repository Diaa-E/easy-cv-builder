import { useState } from "react";
import ListItemIcon from "../components/ListItemIcon";
import AddButton from "../components/AddButton";
import TextInput from "../components/TextInput";
import FormButton from "../components/FormButton";
import SelectInput from "../components/SelectInput";
import linkIcons from "../data/linkIconsBarrel";
import { v4 as generateId } from "uuid";
import { getItemIndex } from "../utils/utility";
import { deleteItem, moveItemUp, toggleHide, updateItems } from "../utils/arrayFunctions";

export default function Links({linksItems, setLinksItems, setDialogState, enabled = true,  emptyText})
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
                    id={"link icon"}
                />
                <TextInput
                    text={currentItem.url}
                    labelText="URL"
                    onChange={(e) => setCurrentItem({...currentItem, url: e.target.value})}
                    clearField={() => {setCurrentItem({...currentItem, url: ""})}}
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
                        text={getItemIndex(linksItems, currentItem.id) > -1 ? "Save" : "Add"}
                        classes={["form-button", "blue-button"]}
                        onClick={() => {
                            setEditMode(false);
                            setLinksItems(updateItems(currentItem, linksItems));
                        }}
                    />
                </div>
            </div>
        )
    }

    return (
        <div className="items-container">
        {
            linksItems.length === 0 &&
            <h2 className="empty-list-text">{emptyText}</h2>
        }
        {
            linksItems.map(item => {
                return <ListItemIcon
                            iconPath={linkIcons.find(icon => item.icon === icon.name).icon}
                            text={item.url}
                            hidden={item.hidden}
                            id={item.id}
                            key={item.id}
                            toggleHide={(id) => setLinksItems(toggleHide(id, linksItems))}
                            toggleEdit={(id) => {
                                setEditMode(true);
                                setCurrentItem(linksItems[getItemIndex(linksItems, id)]);
                            }}
                            deleteItem={(id) => {
                                setDialogState({
                                    open: true,
                                    actionText: "Delete",
                                    prompt: "Are you sure you want to premenantly delete this item from the links section?",
                                    onConfirm: () => {
                                        setLinksItems(deleteItem(id, linksItems))
                                    }
                                })
                            }}
                            moveItemUp={(id) => setLinksItems(moveItemUp(id, linksItems))}
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
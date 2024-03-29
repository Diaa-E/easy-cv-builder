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
import appIcons from "../data/appIconsBarrel";
import ToggleAllButton from "../components/ToggleAllButton";
import { isEmptySection } from "../utils/emptySectionDetector";
import { toggleHideSection } from "../utils/toggleHideSection";

export default function Links({linksItems, setLinksItems, setDialogState,  emptyText})
{
    const [editMode, setEditMode] = useState(false);
    const [currentItem, setCurrentItem] = useState({});

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
            linksItems.length !== 0 &&
            <div className="list-controls">
                <ToggleAllButton
                    icon={appIcons.delete}
                    toolTip={"Delete all links items"}
                    colorClasses={["toggle-all-button-red"]}
                    onClick={() => setDialogState({
                        open: true,
                        actionText: "Delete All",
                        dangerAction: true,
                        prompt: "Are you sure you want to *premenantly delete all items* the links section?",
                        onConfirm: () => {
                            setLinksItems([]);
                        }
                    })}
                />
                <ToggleAllButton
                    icon={isEmptySection(linksItems) ? appIcons.hidden : appIcons.visible}
                    toolTip={"Hide all links items"}
                    colorClasses={["toggle-all-button-white"]}
                    onClick={() => setLinksItems(toggleHideSection(linksItems, !isEmptySection(linksItems)))}
                />
            </div>
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
                                    dangerAction: true,
                                    prompt: "Are you sure you want to *premenantly delete* this item from the links section?",
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
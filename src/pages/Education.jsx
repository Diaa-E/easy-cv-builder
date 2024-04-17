import { useState } from "react";
import ListItemText from "../components/ListItemText";
import AddButton from "../components/AddButton";
import TextInput from "../components/TextInput";
import FormButton from "../components/FormButton";
import ToggleAllButton from "../components/ToggleAllButton";
import { getItemIndex } from "../utils/utility";
import { toggleHide, deleteItem, moveItemUp, updateItems } from "../utils/arrayFunctions";
import { v4 as generateId } from 'uuid';
import appIcons from "../data/appIconsBarrel";
import { isEmptySection } from "../utils/emptySectionDetector";
import { toggleHideSection } from "../utils/toggleHideSection";

export default function Education({educationItems, setEducationItems, setDialogState, emptyText})
{
    const [editMode, setEditMode] = useState(false);
    const [currentItem, setCurrentItem] = useState({});

    if (editMode)
    {
        return (
            <div className="items-container">
                <h2 className="edit-title">{`${getItemIndex(educationItems, currentItem.id) > -1 ? "Edit" : "Add"} Degree`}</h2>
                <TextInput
                    text={currentItem.degree}
                    labelText="Degree"
                    onChange={(e) => {setCurrentItem({...currentItem, degree: e.target.value})}}
                    clearField={() => {setCurrentItem({...currentItem, degree: ""})}}
                    placeholder="degree"
                    id="degree"
                />
                <TextInput
                    text={currentItem.school}
                    labelText="School"
                    onChange={(e) => {setCurrentItem({...currentItem, school: e.target.value})}}
                    clearField={() => {setCurrentItem({...currentItem, school: ""})}}
                    placeholder="school"
                    id="school"
                />
                <TextInput
                    text={currentItem.location}
                    labelText="Location"
                    onChange={(e) => {setCurrentItem({...currentItem, location: e.target.value})}}
                    clearField={() => {setCurrentItem({...currentItem, location: ""})}}
                    placeholder="location"
                    id="location"
                />
                <TextInput
                    text={currentItem.start}
                    labelText="Start"
                    onChange={(e) => {setCurrentItem({...currentItem, start: e.target.value})}}
                    clearField={() => {setCurrentItem({...currentItem, start: ""})}}
                    placeholder="start"
                    id="start"
                />
                <TextInput
                    text={currentItem.end}
                    labelText="End"
                    onChange={(e) => {setCurrentItem({...currentItem, end: e.target.value})}}
                    clearField={() => {setCurrentItem({...currentItem, end: ""})}}
                    placeholder="end"
                    id="end"
                />
                <div className="edit-controls">
                    <FormButton
                        text='Cancel'
                        classes={["form-button", "white-button"]}
                        onClick={() => {setEditMode(false)}}
                    />
                    <FormButton
                        text={getItemIndex(educationItems, currentItem.id) > -1 ? "Save" : "Add"}
                        classes={["form-button", "blue-button"]}
                        onClick={() => {
                            setEditMode(false);
                            setEducationItems(updateItems(currentItem, educationItems));
                        }}
                    />
                </div>
            </div>
        )
    }

    return (
        <div className="items-container">
        {
            educationItems.length === 0 &&
            <h2 className="empty-list-text">{emptyText}</h2>
        }
        {
            educationItems.length !== 0 &&
            <div className="list-controls">
                <ToggleAllButton
                    icon={appIcons.delete}
                    toolTip={"Delete all education items"}
                    colorClasses={["toggle-all-button-red"]}
                    onClick={() => setDialogState({
                        open: true,
                        actionText: "Delete All",
                        dangerAction: true,
                        prompt: "Are you sure you want to *premenantly delete all items* the education section?",
                        onConfirm: () => {
                            setEducationItems([]);
                        }
                    })}
                />
                <ToggleAllButton
                    icon={isEmptySection(educationItems) ? appIcons.hidden : appIcons.visible}
                    toolTip={"Hide all education items"}
                    colorClasses={["toggle-all-button-white"]}
                    onClick={() => setEducationItems(toggleHideSection(educationItems, !isEmptySection(educationItems)))}
                />
            </div>
        }
        {
            educationItems.map(item => {
                return <ListItemText
                            title={item.degree}
                            firstLine={item.degree}
                            secondLine={item.school}
                            hidden={item.hidden}
                            id={item.id}
                            key={item.id}
                            toggleHide={(id) => setEducationItems(toggleHide(id, educationItems))}
                            toggleEdit={(id) => {
                                setEditMode(true);
                                setCurrentItem(educationItems[getItemIndex(educationItems, id)]);
                            }}
                            deleteItem={(id) => {
                                setDialogState({
                                    open: true,
                                    actionText: "Delete",
                                    dangerAction: true,
                                    prompt: "Are you sure you want to *premenantly delete* this item from the education section?",
                                    onConfirm: () => {
                                        setEducationItems(deleteItem(id, educationItems));
                                    }
                                });
                            }}
                            moveItemUp={id => setEducationItems(moveItemUp(id, educationItems))}
                        />
            })
        }
        {
            <AddButton itemType="education" onclick={() => {
                setCurrentItem({
                    id: generateId(),
                    degree: "",
                    school: "",
                    location: "",
                    start: "",
                    end: "",
                    hidden: false
                });
                setEditMode(true);
            }}/>
        }
        </div>
    )
}
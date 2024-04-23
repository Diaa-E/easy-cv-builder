import { useState } from "react";
import ListItemText from "../components/ListItemText";
import AddButton from "../components/AddButton";
import TextInput from "../components/TextInput";
import FormButton from "../components/FormButton";
import TextAreaInput from "../components/TextAreaInput";
import { v4 as generateId } from "uuid";
import { getItemIndex } from "../utils/utility";
import appIcons from "../data/appIconsBarrel";
import ToggleAllButton from "../components/ToggleAllButton";
import { isEmptySection } from "../utils/emptySectionDetector";
import styles from "../styles/App.module.css";

export default function Experience({experienceItems, dispatchExperience, setDialogState, emptyText})
{
    const [editMode, setEditMode] = useState(false);
    const [currentItem, setCurrentItem] = useState({});

    if (editMode)
    {
        return (
            <div className={styles["items-container"]}>
                <h2 className={styles["edit-title"]}>{`${getItemIndex(experienceItems, currentItem.id) > -1 ? "Edit" : "Add"} Job`}</h2>
                <TextInput
                    text={currentItem.company}
                    labelText="Company"
                    onChange={(e) => {setCurrentItem({...currentItem, company: e.target.value})}}
                    clearField={() => {setCurrentItem({...currentItem, company: ""})}}
                    placeholder="company"
                    id="company"
                />
                <TextInput
                    text={currentItem.position}
                    labelText="Position"
                    onChange={(e) => {setCurrentItem({...currentItem, position: e.target.value})}}
                    clearField={() => {setCurrentItem({...currentItem, position: ""})}}
                    placeholder="position"
                    id="position"
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
                <TextAreaInput
                    text={currentItem.details}
                    labelText="Details"
                    onChange={(e) => {setCurrentItem({...currentItem, details: e.target.value})}}
                    placeholder="details"
                    id="details"
                />
                <div className={styles["edit-controls"]}>
                    <FormButton
                        text='Cancel'
                        style="secondary"
                        onClick={() => {setEditMode(false)}}
                    />
                    <FormButton
                        text={getItemIndex(experienceItems, currentItem.id) > -1 ? "Save" : "Add"}
                        style="primary"
                        onClick={() => {
                            setEditMode(false);
                            dispatchExperience({type: "updateList", newItem: currentItem});
                        }}
                    />
                </div>
            </div>
        )
    }

    return (
        <div className={styles["items-container"]}>
        {
            experienceItems.length === 0 &&
            <h2 className={styles["empty-list-text"]}>{emptyText}</h2>
        }
        {
            experienceItems.length !== 0 &&
            <div className={styles["list-controls"]}>
                <ToggleAllButton
                    icon={appIcons.delete}
                    toolTip={"Delete all experience items"}
                    danger={true}
                    onClick={() => setDialogState({
                        open: true,
                        actionText: "Delete All",
                        dangerAction: true,
                        prompt: "Are you sure you want to *premenantly delete all items* the experience section?",
                        onConfirm: () => {
                            dispatchExperience({type: "deleteAll"});
                        }
                    })}
                />
                <ToggleAllButton
                    icon={isEmptySection(experienceItems) ? appIcons.hidden : appIcons.visible}
                    toolTip={"Hide all experience items"}
                    colorClasses={["toggle-all-button-white"]}
                    onClick={() => dispatchExperience({type: "toggleHideAll"})}
                />
            </div>
        }
        <ul className={styles["items-container"]} aria-label="experience list">
        {
            experienceItems.map(item => {
                return <ListItemText
                            title={item.company}
                            firstLine={item.company}
                            secondLine={item.position}
                            hidden={item.hidden}
                            id={item.id}
                            key={item.id}
                            setDialogState={setDialogState}
                            dispatchList={dispatchExperience}
                            toggleEdit={() => {
                                setEditMode(true);
                                setCurrentItem(experienceItems[getItemIndex(experienceItems, item.id)]);
                            }}
                        />
            })
        }
        </ul>
        <AddButton itemType="experience" onclick={() => {
            setCurrentItem({
                id: generateId(),
                company: "",
                location: "",
                position: "",
                start: "",
                end: "",
                details: "",
                hidden: false,
            });
            setEditMode(true);
        }}/>
        </div>
    )
}
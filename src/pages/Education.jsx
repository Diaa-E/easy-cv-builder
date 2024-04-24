import { useContext, useState } from "react";
import ListItemText from "../components/ListItemText";
import AddButton from "../components/AddButton";
import TextInput from "../components/TextInput";
import FormButton from "../components/FormButton";
import ToggleAllButton from "../components/ToggleAllButton";
import { getItemIndex } from "../utils/utility";
import { v4 as generateId } from 'uuid';
import appIcons from "../data/appIconsBarrel";
import { isEmptySection } from "../utils/emptySectionDetector";
import styles from "../styles/App.module.css";
import { DialogContext } from "../App";

export default function Education({educationItems, dispatchEducation, emptyText})
{
    const [editMode, setEditMode] = useState(false);
    const [currentItem, setCurrentItem] = useState({});
    const dispatchDialog = useContext(DialogContext);

    if (editMode)
    {
        return (
            <div className={styles["items-container"]}>
                <h2 className={styles["edit-title"]}>{`${getItemIndex(educationItems, currentItem.id) > -1 ? "Edit" : "Add"} Degree`}</h2>
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
                <div className={styles["edit-controls"]}>
                    <FormButton
                        text='Cancel'
                        style="secondary"
                        onClick={() => {setEditMode(false)}}
                    />
                    <FormButton
                        text={getItemIndex(educationItems, currentItem.id) > -1 ? "Save" : "Add"}
                        style="primary"
                        onClick={() => {
                            setEditMode(false);
                            dispatchEducation({type: "updateList", newItem: currentItem});
                        }}
                    />
                </div>
            </div>
        )
    }

    return (
        <div className={styles["items-container"]}>
        {
            educationItems.length === 0 &&
            <h2 className={styles["empty-list-text"]}>{emptyText}</h2>
        }
        {
            educationItems.length !== 0 &&
            <div className={styles["list-controls"]}>
                <ToggleAllButton
                    icon={appIcons.delete}
                    toolTip={"Delete all education items"}
                    danger={true}
                    onClick={() => {
                        dispatchDialog({
                            type: "openDanger",
                            prompt: "Are you sure you want to *premenantly delete all items* the education section?",
                            actionText: "Delete All",
                            onConfirm: () => dispatchEducation({type: "deleteAll"}),
                        })
                    }}
                />
                <ToggleAllButton
                    icon={isEmptySection(educationItems) ? appIcons.hidden : appIcons.visible}
                    toolTip={"Hide all education items"}
                    colorClasses={["toggle-all-button-white"]}
                    onClick={() => dispatchEducation({type: "toggleHideAll"})}
                />
            </div>
        }
        <ul className={styles["items-container"]} aria-label="education list">
        {
            educationItems.map((item, index) => {
                return <ListItemText
                            firstItem={index === 0}
                            title={item.degree}
                            firstLine={item.degree}
                            secondLine={item.school}
                            hidden={item.hidden}
                            id={item.id}
                            key={item.id}
                            dispatchList={dispatchEducation}
                            toggleEdit={() => {
                                setEditMode(true);
                                setCurrentItem(educationItems[getItemIndex(educationItems, item.id)]);
                            }}
                        />
            })
        }
        </ul>
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
import { useContext, useState } from "react";
import ListItemLevel from "../components/ListItemLevel";
import AddButton from "../components/AddButton";
import TextInput from "../components/TextInput";
import FormButton from "../components/FormButton";
import RangeInput from "../components/RangeInput";
import { v4 as generateId } from "uuid";
import { getItemIndex } from "../utils/utility";
import appIcons from "../data/appIconsBarrel";
import ToggleAllButton from "../components/ToggleAllButton";
import { isEmptySection } from "../utils/emptySectionDetector";
import { skillLevels } from "../data/textLevelTemplates";
import styles from "../styles/App.module.css";
import { DialogContext } from "../App";

export default function Skills({skillsItems, dispatchSkills, emptyText, levelMode})
{
    const [editMode, setEditMode] = useState(false);
    const [currentItem, setCurrentItem] = useState({});
    const dispatchDialog = useContext(DialogContext);

    if (editMode)
    {
        return (
            <div className={styles["items-container"]}>
                <h2 className={styles["edit-title"]}>{`${getItemIndex(skillsItems, currentItem.id) > -1 ? "Edit" : "Add"} Skill`}</h2>
                <TextInput
                    text={currentItem.name}
                    labelText="Skill"
                    onChange={(e) => {setCurrentItem({...currentItem, name: e.target.value})}}
                    clearField={() => {setCurrentItem({...currentItem, name: ""})}}
                    placeholder="skill"
                    id="skill"
                />
                <RangeInput
                    value={currentItem.level}
                    labelText={"Show proficiency level"}
                    checked={currentItem.showLevel}
                    onRangeChange={(e) => setCurrentItem({...currentItem, level: e.target.value < 20? 20 : e.target.value})}
                    onCheckedChange={(e) => setCurrentItem({...currentItem, showLevel: e.target.checked})}
                    id="level"
                    textLevels={skillLevels}
                    levelMode={levelMode}
                />
                <div className={styles["edit-controls"]}>
                    <FormButton
                        text='Cancel'
                        style="secondary"
                        onClick={() => {setEditMode(false)}}
                    />
                    <FormButton
                        text={getItemIndex(skillsItems, currentItem.id) > -1 ? "Save" : "Add"}
                        style="primary"
                        onClick={() => {
                            setEditMode(false);
                            dispatchSkills({type: "updateList", newItem: currentItem});
                        }}
                    />
                </div>
            </div>
        )
    }

    return (
        <div className={styles["items-container"]}>
        {
            skillsItems.length === 0 &&
            <h2 className={styles["empty-list-text"]}>{emptyText}</h2>
        }
        {
            skillsItems.length !== 0 &&
            <div className={styles["list-controls"]}>
                <ToggleAllButton
                    icon={appIcons.delete}
                    toolTip={"Delete all skills items"}
                    danger={true}
                    onClick={() => {
                        dispatchDialog({
                            type: "openDanger",
                            prompt: "Are you sure you want to *premenantly delete all items* the skills section?",
                            actionText: "Delete All",
                            onConfirm: () => dispatchSkills({type: "deleteAll"}),
                        })
                    }}
                />
                <ToggleAllButton
                    icon={isEmptySection(skillsItems) ? appIcons.hidden : appIcons.visible}
                    toolTip={"Hide all skills items"}
                    colorClasses={["toggle-all-button-white"]}
                    onClick={() => dispatchSkills({type: "toggleHideAll"})}
                />
            </div>
        }
        <ul className={styles["items-container"]} aria-label="skills list">
        {
            skillsItems.map(item => {
                return <ListItemLevel
                            textLevels={skillLevels}
                            levelMode={levelMode}
                            itemData={item}
                            id={item.id}
                            key={item.id}
                            dispatchList={dispatchSkills}
                            toggleEdit={() => {
                                setEditMode(true);
                                setCurrentItem(skillsItems[getItemIndex(skillsItems, item.id)]);
                            }}
                        />
            })
        }
        </ul>
        <AddButton itemType="skill" onclick={() => {
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
import { useState } from "react";
import ListItemLevel from "../components/ListItemLevel";
import AddButton from "../components/AddButton";
import TextInput from "../components/TextInput";
import FormButton from "../components/FormButton";
import RangeInput from "../components/RangeInput";
import { v4 as generateId } from "uuid";
import { getItemIndex } from "../utils/utility";
import { deleteItem, moveItemUp, toggleHide, updateItems } from "../utils/arrayFunctions";
import appIcons from "../data/appIconsBarrel";
import ToggleAllButton from "../components/ToggleAllButton";
import { isEmptySection } from "../utils/emptySectionDetector";
import { toggleHideSection } from "../utils/toggleHideSection";
import { skillLevels } from "../data/textLevelTemplates";

export default function Skills({skillsItems, setSkillsItems, setDialogState, emptyText, levelMode})
{
    const [editMode, setEditMode] = useState(false);
    const [currentItem, setCurrentItem] = useState({});

    if (editMode)
    {
        return (
            <div className="items-container">
                <h2 className="edit-title">{`${getItemIndex(skillsItems, currentItem.id) > -1 ? "Edit" : "Add"} Skill`}</h2>
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
                <div className="edit-controls">
                    <FormButton
                        text='Cancel'
                        classes={["form-button", "white-button"]}
                        onClick={() => {setEditMode(false)}}
                    />
                    <FormButton
                        text={getItemIndex(skillsItems, currentItem.id) > -1 ? "Save" : "Add"}
                        classes={["form-button", "blue-button"]}
                        onClick={() => {
                            setEditMode(false);
                            setSkillsItems(updateItems(currentItem, skillsItems));
                        }}
                    />
                </div>
            </div>
        )
    }

    return (
        <div className="items-container">
        {
            skillsItems.length === 0 &&
            <h2 className="empty-list-text">{emptyText}</h2>
        }
        {
            skillsItems.length !== 0 &&
            <div className="list-controls">
                <ToggleAllButton
                    icon={appIcons.delete}
                    toolTip={"Delete all skills items"}
                    colorClasses={["toggle-all-button-red"]}
                    onClick={() => setDialogState({
                        open: true,
                        actionText: "Delete All",
                        dangerAction: true,
                        prompt: "Are you sure you want to *premenantly delete all items* the skills section?",
                        onConfirm: () => {
                            setSkillsItems([]);
                        }
                    })}
                />
                <ToggleAllButton
                    icon={isEmptySection(skillsItems) ? appIcons.hidden : appIcons.visible}
                    toolTip={"Hide all skills items"}
                    colorClasses={["toggle-all-button-white"]}
                    onClick={() => setSkillsItems(toggleHideSection(skillsItems, !isEmptySection(skillsItems)))}
                />
            </div>
        }
        <ul>
        {
            skillsItems.map(item => {
                return <ListItemLevel
                            textLevels={skillLevels}
                            levelMode={levelMode}
                            itemData={item}
                            key={item.id}
                            toggleHide={(id) => setSkillsItems(toggleHide(id, skillsItems))}
                            toggleEdit={(id) => {
                                setEditMode(true);
                                setCurrentItem(skillsItems[getItemIndex(skillsItems, id)]);
                            }}
                            deleteItem={(id) => {
                                setDialogState({
                                    open: true,
                                    actionText: "Delete",
                                    dangerAction: true,
                                    prompt: "Are you sure you want to *premenantly delete* this item from the skills section?",
                                    onConfirm: () => {
                                        setSkillsItems(deleteItem(id, skillsItems));
                                    }
                                });
                            }}
                            moveItemUp={(id) => setSkillsItems(moveItemUp(id, skillsItems))}
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
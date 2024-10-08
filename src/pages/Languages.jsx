import { useContext, useState } from "react";
import ListItemLevel from "../components/ListItemLevel";
import AddButton from "../components/AddButton";
import TextInput from "../components/TextInput";
import FormButton from "../components/FormButton";
import RangeInput from "../components/RangeInput";
import { v4  as generateId} from "uuid";
import { getItemIndex } from "../utils/utility";
import appIcons from "../data/appIconsBarrel";
import ToggleAllButton from "../components/ToggleAllButton";
import { isEmptySection } from "../utils/emptySectionDetector";
import { languageLevels } from "../data/textLevelTemplates";
import styles from "../styles/App.module.css";
import { DialogContext } from "../App";

export default function Languages({languagesItems, dispatchLanguages, emptyText, levelMode})
{
    const [editMode, setEditMode] = useState(false);
    const [currentItem, setCurrentItem] = useState({});
    const dispatchDialog = useContext(DialogContext);

    if (editMode)
    {
        return (
            <div className={styles["items-container"]}>
                <h2 className={styles["edit-title"]}>{`${getItemIndex(languagesItems, currentItem.id) > -1 ? "Edit" : "Add"} Language`}</h2>
                <TextInput
                    text={currentItem.name}
                    labelText="Language"
                    onChange={(e) => {setCurrentItem({...currentItem, name: e.target.value})}}
                    clearField={() => {setCurrentItem({...currentItem, name: ""})}}
                    placeholder="language"
                    id="language"
                />
                <RangeInput
                    value={currentItem.level}
                    labelText={"Show proficiency level"}
                    checked={currentItem.showLevel}
                    onRangeChange={(e) => setCurrentItem({...currentItem, level: e.target.value < 20? 20 : e.target.value})}
                    onCheckedChange={(e) => setCurrentItem({...currentItem, showLevel: e.target.checked})}
                    id="level"
                    textLevels={languageLevels}
                    levelMode={levelMode}
                />
                <div className={styles["edit-controls"]}>
                    <FormButton
                        text='Cancel'
                        style="secondary"
                        onClick={() => {setEditMode(false)}}
                    />
                    <FormButton
                        text={getItemIndex(languagesItems, currentItem.id) > -1 ? "Save" : "Add"}
                        style="primary"
                        onClick={() => {
                            setEditMode(false);
                            dispatchLanguages({type: "updateList", newItem: currentItem});
                        }}
                    />
                </div>
            </div>
        )
    }

    return (
        <div className={styles["items-container"]}>
        {
            languagesItems.length === 0 &&
            <h2 className={styles["empty-list-text"]}>{emptyText}</h2>
        }
        {
            languagesItems.length !== 0 &&
            <div className={styles["list-controls"]}>
                <FormButton
                    style="danger"
                    text="Delete All"
                    onClick={() => {
                        dispatchDialog({
                            type: "openDanger",
                            prompt: "Are you sure you want to *premenantly delete all items* in the languages section?",
                            actionText: "Delete All",
                            onConfirm: () => dispatchLanguages({type: "deleteAll"}),
                        })
                    }}
                    toolTip={"Delete all language items"}
                />
                <FormButton
                    style="secondary"
                    text={isEmptySection(languagesItems) ? "Show All" : "Hide All"}
                    toolTip={"Hide all language items"}
                    onClick={() => dispatchLanguages({type: "toggleHideAll"})}
                />
            </div>
        }
        <ul className={styles["items-container"]} aria-label="languages list">
        {
            languagesItems.map((item, index) => {
            return <ListItemLevel
                        firstItem={index === 0}
                        textLevels={languageLevels}
                        levelMode={levelMode}
                        itemData={item}
                        id={item.id}
                        key={item.id}
                        dispatchList={dispatchLanguages}
                        toggleEdit={() => {
                            setEditMode(true);
                            setCurrentItem(languagesItems[getItemIndex(languagesItems, item.id)]);
                        }}
                    />
            }) 
        }
        </ul>
        <AddButton itemType="language" onclick={() => {
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
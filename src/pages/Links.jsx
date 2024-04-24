import { useContext, useState } from "react";
import LinkItem from "../components/LinkItem";
import AddButton from "../components/AddButton";
import TextInput from "../components/TextInput";
import FormButton from "../components/FormButton";
import SelectInput from "../components/SelectInput";
import linkIcons from "../data/linkIconsBarrel";
import { v4 as generateId } from "uuid";
import { getItemIndex } from "../utils/utility";
import appIcons from "../data/appIconsBarrel";
import ToggleAllButton from "../components/ToggleAllButton";
import { isEmptySection } from "../utils/emptySectionDetector";
import styles from "../styles/App.module.css";
import { DialogContext } from "../App";

export default function Links({linksItems, dispatchLinks, emptyText})
{
    const [editMode, setEditMode] = useState(false);
    const [currentItem, setCurrentItem] = useState({});
    const dispatchDialog = useContext(DialogContext);

    if (editMode)
    {
        return (
            <div className={styles["items-container"]}>
                <h2 className={styles["edit-title"]}>{`${getItemIndex(linksItems, currentItem.id) > -1 ? "Edit" : "Add"} Link`}</h2>
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
                <div className={styles["edit-controls"]}>
                    <FormButton
                        text='Cancel'
                        style="secondary"
                        onClick={() => {setEditMode(false)}}
                    />
                    <FormButton
                        text={getItemIndex(linksItems, currentItem.id) > -1 ? "Save" : "Add"}
                        style="primary"
                        onClick={() => {
                            setEditMode(false);
                            dispatchLinks({type: "updateList", newItem: currentItem});
                        }}
                    />
                </div>
            </div>
        )
    }

    return (
        <div className={styles["items-container"]}>
        {
            linksItems.length === 0 &&
            <h2 className={styles["empty-list-text"]}>{emptyText}</h2>
        }
        {
            linksItems.length !== 0 &&
            <div className={styles["list-controls"]}>
                <ToggleAllButton
                    icon={appIcons.delete}
                    toolTip={"Delete all links items"}
                    danger={true}
                    onClick={() => {
                        dispatchDialog({
                            type: "openDanger",
                            prompt: "Are you sure you want to *premenantly delete all items* in the links section?",
                            actionText: "Delete All",
                            onConfirm: () => dispatchLinks({type: "deleteAll"})
                        });
                    }}
                />
                <ToggleAllButton
                    icon={isEmptySection(linksItems) ? appIcons.hidden : appIcons.visible}
                    toolTip={"Hide all links items"}
                    colorClasses={["toggle-all-button-white"]}
                    onClick={() => dispatchLinks({type: "toggleHideAll"})}
                />
            </div>
        }
        <ul className={styles["items-container"]} aria-label="links list">
        {
            linksItems.map((item, index) => {
                return <LinkItem
                            firsItem={index === 0}
                            website={item.icon}
                            iconPath={linkIcons.find(icon => item.icon === icon.name).icon}
                            text={item.url}
                            hidden={item.hidden}
                            id={item.id}
                            key={item.id}
                            dispatchList={dispatchLinks}
                            toggleEdit={() => {
                                setEditMode(true);
                                setCurrentItem(linksItems[getItemIndex(linksItems, item.id)]);
                            }}
                        />
            })
        }       
        </ul>
        <AddButton itemType="link" onclick={() => {
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
import { useState } from "react";
import ListItemText from "./ListItemText";
import AddButton from "./AddButton";
import TextInput from "./TextInput";
import FormButton from "./FormButton";
import { getItemIndex } from "../utility";
import { v4 as generateId } from 'uuid';

export default function Education({educationItems, enabled = true, toggleHide, updateItems, deleteItem, moveItemUp, emptyText})
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

    return (
        <div className="items-container">
        {
            educationItems.length === 0 &&
            <h2 className="empty-list-text">{emptyText}</h2>
        }
        {
            educationItems.map(item => {
                return <ListItemText
                            firstLine={item.degree}
                            secondLine={item.school}
                            hidden={item.hidden}
                            id={item.id}
                            key={item.id}
                            toggleHide={toggleHide}
                            toggleEdit={(id) => {
                                setEditMode(true)
                                setCurrentItem(educationItems.find(item => item.id === id))
                            }}
                            deleteItem={(id) => {
                                deleteItem(id);
                            }}
                            moveItemUp={id => moveItemUp(id)}
                        />
            })
        }
        {
            <AddButton onclick={() => {
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
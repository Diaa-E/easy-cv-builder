import { useState } from "react";
import ListItemText from "./ListItemText";
import AddButton from "./AddButton";
import TextInput from "./TextInput";
import FormButton from "./FormButton";

export default function Education({educationItems, enabled = true, addItem, toggleHide, updateItems, deleteItem, moveItemUp, emptyText})
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
                <h2>Edit Degree</h2>
                <TextInput
                    text={currentItem.degree}
                    labelText="Degree"
                    onChange={(e) => {setCurrentItem({...currentItem, degree: e.target.value})}}
                    placeholder="degree"
                    id="degree"
                />
                <TextInput
                    text={currentItem.school}
                    labelText="School"
                    onChange={(e) => {setCurrentItem({...currentItem, school: e.target.value})}}
                    placeholder="school"
                    id="school"
                />
                <TextInput
                    text={currentItem.location}
                    labelText="Location"
                    onChange={(e) => {setCurrentItem({...currentItem, location: e.target.value})}}
                    placeholder="location"
                    id="location"
                />
                <TextInput
                    text={currentItem.start}
                    labelText="Start"
                    onChange={(e) => {setCurrentItem({...currentItem, start: e.target.value})}}
                    placeholder="start"
                    id="start"
                />
                <TextInput
                    text={currentItem.end}
                    labelText="End"
                    onChange={(e) => {setCurrentItem({...currentItem, end: e.target.value})}}
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

    if (educationItems.length === 0)
    {
        return (
            <div className="items-container">
                <h2 className="empty-list-text">{emptyText}</h2>
                <AddButton onclick={addItem}/>
            </div>
        )
    }

    return (
        <div className="items-container">
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
                                    setEditMode(false);
                                    deleteItem(id);
                                }}
                                moveItemUp={id => moveItemUp(id)}
                            />
                })
            }
            <AddButton onclick={addItem}/>
        </div>
    )
}
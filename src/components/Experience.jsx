import { useState } from "react";
import ListItemText from "./ListItemText";
import AddButton from "./AddButton";
import TextInput from "./TextInput";
import FormButton from "./FormButton";
import TextAreaInput from "./TextAreaInput";

export default function Experience({experienceItems, enabled = true, addItem, toggleHide, updateItems, deleteItem, emptyText})
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
                <h2>Edit Job</h2>
                <TextInput
                    text={currentItem.company}
                    labelText="Company"
                    onChange={(e) => {setCurrentItem({...currentItem, company: e.target.value})}}
                    placeholder="company"
                    id="company"
                />
                <TextInput
                    text={currentItem.position}
                    labelText="Position"
                    onChange={(e) => {setCurrentItem({...currentItem, position: e.target.value})}}
                    placeholder="position"
                    id="position"
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
                <TextAreaInput
                    text={currentItem.details}
                    labelText="Details"
                    onChange={(e) => {setCurrentItem({...currentItem, details: e.target.value})}}
                    placeholder="details"
                    id="details"
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

    if (experienceItems.length === 0)
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
                experienceItems.map(item => {
                    return <ListItemText
                                firstLine={item.company}
                                secondLine={item.position}
                                hidden={item.hidden}
                                id={item.id}
                                key={item.id}
                                toggleHide={toggleHide}
                                toggleEdit={(id) => {
                                    setEditMode(true)
                                    setCurrentItem(experienceItems.find(item => item.id === id))
                                }}
                                deleteItem={(id) => {
                                    setEditMode(false);
                                    deleteItem(id);
                                }}
                            />
                })
            }
            <AddButton onclick={addItem}/>
        </div>
    ) 
}
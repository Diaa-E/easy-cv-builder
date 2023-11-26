import { useState } from "react";
import EducationItem from "./EducationItem";
import AddButton from "./AddButton";
import TextInput from "./TextInput";
import FormButton from "./FormButton";

export default function Education({educationItems, enabled = true, addItem, toggleHide})
{
    const [editMode, setEditMode] = useState(false);
    const [currentItemId, setCurrentItemId] = useState(educationItems[0]?.id);
    const currentItem = educationItems.find(item => item.id === currentItemId);

    if (enabled)
    {
        if (editMode)
        {
            return (
                <div className="items-container">
                    <h2>Edit Degree</h2>
                    <TextInput
                        text={currentItem.degree}
                        labelText="Degree"
                        onChange={() => {}}
                        placeholder="degree"
                        id="degree"
                    />
                    <TextInput
                        text={currentItem.school}
                        labelText="School"
                        onChange={() => {}}
                        placeholder="school"
                        id="school"
                    />
                    <TextInput
                        text={currentItem.location}
                        labelText="Location"
                        onChange={() => {}}
                        placeholder="location"
                        id="location"
                    />
                    <TextInput
                        text={currentItem.start}
                        labelText="Start"
                        onChange={() => {}}
                        placeholder="start"
                        id="start"
                    />
                    <TextInput
                        text={currentItem.end}
                        labelText="End"
                        onChange={() => {}}
                        placeholder="end"
                        id="end"
                    />
                    <div className="edit-controls">
                    <FormButton text='Delete' classes={["form-button", "red-button"]} onClick={() => {}}/>
                    <FormButton text='Cancel' classes={["form-button", "white-button"]} onClick={() => {setEditMode(false)}}/>
                    <FormButton text='Save' classes={["form-button", "blue-button"]} onClick={() => {}}/>
                    </div>
                </div>
            )
        }
        else
        {
            return (
                <div className="items-container">
                    {
                        educationItems.map(item => {
                            return <EducationItem
                                        degree={item.degree}
                                        school={item.school}
                                        hidden={item.hidden}
                                        id={item.id}
                                        key={item.id}
                                        toggleHide={toggleHide}
                                        toggleEdit={(id) => {
                                            setEditMode(true)
                                            setCurrentItemId(id)
                                        }}
                                    />
                        })
                    }
                    <AddButton onclick={addItem}/>
                </div>
            )
        }
    }
    else
    {
        return <></>
    }
}
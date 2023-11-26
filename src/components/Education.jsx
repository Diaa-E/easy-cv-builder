import EducationItem from "./EducationItem";
import AddButton from "./AddButton";

export default function Education({educationItems, enabled = true})
{
    if (enabled)
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
                                />
                    })
                }
                <AddButton/>
            </div>
        )
    }
    else
    {
        return <></>
    }
}
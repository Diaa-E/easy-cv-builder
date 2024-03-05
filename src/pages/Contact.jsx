import TextInput from "../components/TextInput";

export default function Contact({enabled, contact, setContact})
{
    if (enabled)
    {
        return (
            <>
                <TextInput
                    text={contact.phoneNumber}
                    labelText="Phone Number"
                    onChange={(e) => {setContact({...contact, phoneNumber: e.target.value})}}
                    clearField={() => {setContact({...contact, phoneNumber: ""})}}
                    placeholder="+xx xxxxxxxxx"
                    id="phoneNumber"
                />
                <TextInput
                    text={contact.email}
                    labelText="Email"
                    onChange={(e) => {setContact({...contact, email: e.target.value})}}
                    clearField={() => {setContact({...contact, email: ""})}}
                    placeholder="john_doe@email.com"
                    id="e-mail"
                />
            </>
        )
    }
    else
    {
        return <></>
    }
}
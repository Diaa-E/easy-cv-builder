import TextInput from "./TextInput";

export default function Contact({enabled, phoneNumber, updatePhoneNumber, email, updateEmail})
{
    if (enabled)
    {
        return (
            <>
                <TextInput
                    text={phoneNumber}
                    labelText="Phone Number"
                    onChange={updatePhoneNumber}
                    placeholder="+xx xxxxxxxxx"
                    id="phoneNumber"
                />
                <TextInput
                    text={email}
                    labelText="Email"
                    onChange={updateEmail}
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
import TextInput from "./TextInput";

export default function PersonalInformation({enabled, fullName, updateFullName, profession, updateProfession, address, updateAddress, zip, updateZip})
{
    if (enabled)
    {
        return (
            <>
                <TextInput
                    text={fullName}
                    labelText="Full Name"
                    onChange={updateFullName}
                    placeholder="John Doe"
                    id="fullName"
                />
                <TextInput
                    text={profession}
                    labelText="Profession"
                    onChange={updateProfession}
                    placeholder="Graphic Designer"
                    id="profession"
                />
                <TextInput
                    text={address}
                    labelText="Address"
                    onChange={updateAddress}
                    placeholder="x unknown st., city"
                    id="address"
                />
                <TextInput
                    text={zip}
                    labelText="Zipcode"
                    onChange={updateZip}
                    placeholder="19872"
                    id="zip"
                />
            </>
        )
    }
    else
    {
        return <></>
    }
}
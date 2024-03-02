import TextInput from "./TextInput";
import { getStartCase } from "../startCase";

export default function PersonalInformation({enabled, personalInfo, setPersonalInfo})
{
    if (enabled)
    {
        return (
            <>
                <TextInput
                    text={personalInfo.fullName}
                    labelText="Full Name"
                    onChange={(e) => {setPersonalInfo({...personalInfo, fullName: getStartCase(e.target.value)})}}
                    clearField={() => {setPersonalInfo({...personalInfo, fullName: ""})}}
                    placeholder="John Doe"
                    id="fullName"
                />
                <TextInput
                    text={personalInfo.profession}
                    labelText="Profession"
                    onChange={(e) => {setPersonalInfo({...personalInfo, profession: e.target.value})}}
                    clearField={() => {setPersonalInfo({...personalInfo, profession: ""})}}
                    placeholder="Graphic Designer"
                    id="profession"
                />
                <TextInput
                    text={personalInfo.address}
                    labelText="Address"
                    onChange={(e) => {setPersonalInfo({...personalInfo, address: e.target.value})}}
                    clearField={() => {setPersonalInfo({...personalInfo, address: ""})}}
                    placeholder="x unknown st., city"
                    id="address"
                />
                <TextInput
                    text={personalInfo.zip}
                    labelText="Zipcode"
                    onChange={(e) => {setPersonalInfo({...personalInfo, zip: e.target.value})}}
                    clearField={() => {setPersonalInfo({...personalInfo, zip: ""})}}
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
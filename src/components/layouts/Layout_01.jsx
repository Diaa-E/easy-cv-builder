import "../../styles/layouts/Layout_01.css";

import appIcons from "../../appIconsBarrel";
import linkIcons from "../../linkIconsBarrel";

import { isBright } from "../../utility";

export default function Layout_01({enabled = true, data})
{
    if (!enabled) return <></>;

    const brightAccent = isBright(data.accentColor);
    const textColor = brightAccent? "var(--black)" : "var(--white)";
    const secondaryBackgroundColor = brightAccent? "var(--black)" : data.accentColor;
    const secondaryColor = brightAccent? data.accentColor : "var(--white)";
   
    return (
        <div style={{fontFamily: data.font}} className="preview layout-01">
            <div style={{backgroundColor: data.accentColor}} className="header-wrapper">
                <h1 style={{color: textColor}} className="name">{data.personalInfo.fullName}</h1>
                <h2 style={{color: textColor}} className="profession">{data.personalInfo.profession}</h2>
                <div className="header-items-wrapper">
                    <HeaderItem brightAccent={brightAccent} text={data.personalInfo.address} icon={appIcons.address}/>
                    <HeaderItem brightAccent={brightAccent} text={data.contact.phoneNumber} icon={appIcons.contact}/>
                    <HeaderItem brightAccent={brightAccent} text={data.contact.email} icon={appIcons.email}/>
                    <HeaderItem brightAccent={brightAccent} text={data.personalInfo.zip} icon={appIcons.zip}/>
                    {
                        data.links.map(link => {
                            return (
                                <HeaderItem 
                                    key={link.id}
                                    brightAccent={brightAccent}
                                    text={link.url}
                                    icon={linkIcons.find(icon => icon.name === link.icon).icon}
                                />
                            )
                        })
                    }
                </div>
            </div>
            <EducationSection accentColor={data.accentColor} brightAccent={brightAccent} educationItems={data.education}/>
        </div>
    )
}

function EducationSection({brightAccent, accentColor, educationItems})
{
    if (educationItems.length === 0) return <></>;

    return (
        <div className="education-items-wrapper">
            <h3 style={{backgroundColor: accentColor, color: brightAccent ? "var(--black" : "var(--white"}} className="section-title">Education</h3>
            {
                educationItems.map(item => {
                    return (
                        <div key={item.id} className="education-item">
                        {
                            (item.end !== "" || item.start !== "") &&
                            <p className="section-text">{item.start}-{item.end}</p>
                        }
                        {
                            (item.degree !== "") &&
                            <p className="section-text">{item.degree}</p>
                        }
                        {
                            (item.school !== "" || item.location !== "") &&
                            <p className="section-text">{item.school}, {item.location}</p>
                        }
                        </div>
                    )
                })
            }
        </div>
    )
}

function HeaderItem({icon, text, brightAccent})
{
    return (
        <div className="header-item">
            <img style={{filter: brightAccent ? "" : "invert(1)"}} className="header-item-icon" src={icon} alt="" />
            <p style={{color: brightAccent ? "var(--black)" : "var(--white)"}} className="header-item-text">{text}</p>
        </div>
    )
}
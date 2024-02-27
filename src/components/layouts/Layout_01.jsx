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
                                    brightAccent={brightAccent}
                                    text={link.url}
                                    icon={linkIcons.find(icon => icon.name === link.icon).icon}
                                />
                            )
                        })
                    }
                </div>
            </div>
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
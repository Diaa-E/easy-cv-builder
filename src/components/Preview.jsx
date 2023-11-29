import "../styles/Preview.css";
import "../styles/layouts/layout_01.css";
import appIcons from "../appIconsBarrel";

import { isBright } from "../utility";

export default function Preview({accentColor, layout = "layout-01", data})
{
    const useDarkText = isBright(accentColor);
    const textColor = useDarkText? "var(--text)" : "var(--main)";
    return (
        <div className={`preview ${layout}`}>
            <div style={{backgroundColor: accentColor, color: textColor}} className="header">
                <h1 className="name">{data.personalInfo.fullName}</h1>
                <h2 className="profession">{data.personalInfo.profession}</h2>
                <div className="header-item-container">
                    <HeaderItem useBrightIcon={!useDarkText} icon={appIcons.address} text={data.personalInfo.address} />
                    <HeaderItem useBrightIcon={!useDarkText} icon={appIcons.zip} text={data.personalInfo.zip} />
                    <HeaderItem useBrightIcon={!useDarkText} icon={appIcons.contact} text={data.contact.phoneNumber}/>
                    <HeaderItem useBrightIcon={!useDarkText} icon={appIcons.email} text={data.contact.email}/>
                    {
                        data.links.map(link => {
                            if (link.hidden)
                            {
                                return <></>
                            }
                            else
                            {
                                return  <HeaderItem key={link.id} useBrightIcon={!useDarkText} icon={link.icon} text={link.url}/>
                            }
                        })
                    }
                </div>
            </div>
        </div>
    )
}

function HeaderItem({icon, text, useBrightIcon})
{
    if (text === "")
    {
        return <></>
    }
    else
    {
        return (
            <div className="header-item">
                <img className={`header-icon ${useBrightIcon? "header-icon-bright" : ""}`} src={icon} alt="icon"/>
                <p className="header-item-text">{text}</p>
            </div>
        )
    }
}
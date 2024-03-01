import "../../styles/layouts/Layout_02.css";

import appIcons from "../../appIconsBarrel";
import linkIcons from "../../linkIconsBarrel";

import { isBright } from "../../utility";
import { isEmptySection } from "../../emptySectionDetector";

export default function Layout_02({data})
{
    const useDarkText = isBright(data.accentColor);
    const textColor = useDarkText ? "var(--black)" : "var(--white)";
    const iconColor = useDarkText ? "invert(0)" : "invert(1)";

    return (
        <div className="preview layout-02">
            <div className="left">
                <div style={{backgroundColor: data.accentColor}} className="header-wrapper">
                    <h1 style={{color: textColor}} className="name">{data.personalInfo.fullName}</h1>
                    <h2 style={{color: textColor}} className="profession">{data.personalInfo.profession}</h2>
                    <div style={{borderBottom: `solid calc(var(--width) * .002) ${textColor}`}} className="seperator"></div>
                    <div className="header-items-wrapper">
                        <HeaderItem textColor={textColor} iconColor={iconColor} icon={appIcons.address} text={data.personalInfo.address}/>
                        <HeaderItem textColor={textColor} iconColor={iconColor} icon={appIcons.contact} text={data.contact.phoneNumber}/>
                        <HeaderItem textColor={textColor} iconColor={iconColor} icon={appIcons.email} text={data.contact.email}/>
                        <HeaderItem textColor={textColor} iconColor={iconColor} icon={appIcons.zip} text={data.personalInfo.zip}/>
                        {
                            data.links.map(item => {

                                return (
                                    !item.hidden &&
                                    <HeaderItem
                                        key={item.id}
                                        textColor={textColor}
                                        iconColor={iconColor}
                                        icon={linkIcons.find(icon => icon.name === item.icon).icon}
                                        text={item.url}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
                    <LanguagesSection accentColor={data.accentColor} iconColor={iconColor} languageItems={data.languages}/>
            </div>
        </div>
    )

    function LanguagesSection({accentColor, iconColor, languageItems})
    {
        return (
            !isEmptySection(languageItems) &&
            <div className="section-wrapper">
                <h3 className="section-title">
                    <img style={{filter: iconColor, backgroundColor: accentColor}} className="section-icon" src={appIcons.languages} alt="" />
                    Languages
                </h3>
                <div style={{borderBottom: `solid calc(var(--width) * .002) ${textColor}`}} className="seperator"></div>
                <div className="flow-wrapper">
                {
                    languageItems.map(item => {
                        
                        return (
                            !item.hidden &&
                            <div key={item.id} className="flow-item">
                                <p className="section-text">{item.name}</p>
                                {
                                    item.showLevel &&
                                    <LevelBar level={item.level} accentColor={accentColor}/>
                                }
                            </div>
                        )
                    })
                }
                </div>
            </div>
        )
    }

    function LevelBar({level, accentColor})
{
    return (
        <div className="level-container">
            <span style={{width: level + "%", backgroundColor: accentColor}} className="level"></span>
        </div>
    )
}

    function HeaderItem({textColor, iconColor, text, icon})
    {
        return (
            <div className="header-item">
                <img style={{filter: iconColor}} className="header-item-icon" src={icon} alt="" />
                <p style={{color: textColor}} className="header-item-text">{text}</p>
            </div>
        )
    }
}
import "../../styles/layouts/Layout_02.css";

import appIcons from "../../appIconsBarrel";

import { isBright } from "../../utility";

export default function Layout_02({enabled = true, accentColor, font, data})
{
    const useDarkText = isBright(accentColor);
    const textColor = useDarkText ? "var(--text)" : "var(--main)"

    if (enabled)
    {
        return (
            <div style={{fontFamily: font}} className="preview layout-02">
                <div className="header">
                    <div style={{backgroundColor: accentColor, color: textColor}} className="header-top">
                        <h1 className="name">{data.personalInfo.fullName}</h1>
                        <h2 className="profession">{data.personalInfo.profession}</h2>
                        <div className="header-item-container">
                            <HeaderItem
                                icon={appIcons.address}
                                text={data.personalInfo.address}
                                useBrightIcon={!useDarkText}
                            />
                            <HeaderItem
                                icon={appIcons.zip}
                                text={data.personalInfo.zip}
                                useBrightIcon={!useDarkText}
                            />
                            <HeaderItem
                                icon={appIcons.contact}
                                text={data.contact.phoneNumber}
                                useBrightIcon={!useDarkText}
                            />
                            <HeaderItem
                                icon={appIcons.email}
                                text={data.contact.email}
                                useBrightIcon={!useDarkText}
                            />
                            {
                                data.links.map(item => {
                                    return <HeaderItem
                                                key={item.id}
                                                icon={item.icon}
                                                text={item.url}
                                                useBrightIcon={!useDarkText}
                                                hidden={item.hidden}
                                            />
                                })
                            }
                        </div>
                    </div>
                    <SectionTitle
                        icon={appIcons.languages}
                        text={"Languages"}
                        iconBg={accentColor}
                        useBrightIcon={!useDarkText}
                    />
                    <ul className="language-section-container">
                    {
                        data.languages.map(item => {
                            return (
                                <LanguageItem
                                    barColor={accentColor}
                                    languageItem={item}
                                    hidden={item.hidden}
                                    key={item.id}
                                />
                            )
                        })
                    }
                    </ul>
                </div>
            </div>
        )
    }
    else
    {
        return <></>
    }
}

function SectionTitle({icon, iconBg, text, useBrightIcon = false})
{
    return (
        <div className="section-title-container">
            <div style={{backgroundColor: iconBg}} className="section-title-icon-bg">
                <img className={`section-title-icon ${useBrightIcon ? "section-title-icon-bright" : ""}`} src={icon} alt={`${text} section icon`} />
            </div>
            <h3 className="section-title">{text}</h3>
        </div>
    )
}

function HeaderItem({icon, text, useBrightIcon, hidden = false})
{
    if (text === "" || hidden)
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

function LanguageItem({barColor, languageItem, hidden = false})
{
    if (hidden)
    {
        return <></>
    }
    else
    {
        return (
            <li>
                <div className="language-item-container">
                    <p className="section-item-text">{languageItem.name}</p>
                    <LevelBar barColor={barColor} hidden={!languageItem.showLevel} level={languageItem.level}/>
                </div>
            </li>
        )
    }
}

function LevelBar({barColor, level, hidden})
{
    if (hidden)
    {
        return <></>
    }
    else
    {
        return (
            <div className="bar-container">
                <div style={{width: `${+level}%`, backgroundColor: barColor}} className="bar"></div>
            </div>
        )
    }
}
import "../../styles/layouts/Layout_02.css";

import appIcons from "../../appIconsBarrel";
import linkIcons from "../../linkIconsBarrel";

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
                                                icon={linkIcons.find(icon => icon.name === item.icon).icon}
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
                <div className="body">
                    <SectionTitle
                        icon={appIcons.education}
                        iconBg={accentColor}
                        text={"Education"}
                        useBrightIcon={!useDarkText}
                    />
                    <ul className="section-container">
                    {
                        data.education.map(item => {
                            return (
                                <EducationItem
                                    hidden={item.hidden}
                                    educationItem={item}
                                    key={item.id}
                                />
                            )
                        })
                    }
                    </ul>
                    <SectionTitle
                        icon={appIcons.experience}
                        iconBg={accentColor}
                        text={"Experience"}
                        useBrightIcon={!useDarkText}
                    />
                    <ul className="section-container">
                    {
                        data.experience.map(item => {
                            return (
                                <ExperienceItem
                                    key={item.id}
                                    experienceItem={item}
                                    hidden={item.hidden}
                                />
                            )
                        })
                    }
                    </ul>
                    <SectionTitle
                        icon={appIcons.skills}
                        iconBg={accentColor}
                        text={"Skills"}
                        useBrightIcon={!useDarkText}
                    />
                    <SkillsSection
                        barColor={accentColor}
                        skillsItems={data.skills}
                    />
                </div>
            </div>
        )
    }
    else
    {
        return <></>
    }
}

function ExperienceItem({experienceItem, hidden = false})
{
    if (hidden)
    {
        return <></>
    }
    else
    {
        return (
            <li className="section-item-container">
                <div className="section-item-cell">
                    <p className="section-item-text">{experienceItem.start}-{experienceItem.end}</p>
                    <p className="section-item-text">{experienceItem.location}</p>
                </div>
                <div className="section-item-cell">
                    <p className="section-item-text">{experienceItem.company}</p>
                    <p className="section-item-text">{experienceItem.position}</p>
                </div>
                <div className="section-item-cell">
                    <p className="section-item-text">{experienceItem.details}</p>
                </div>
            </li>
        )
    }
}

function SkillsSection({skillsItems, barColor})
{
    return (
        <ul className="skills-items-container">
        {
            skillsItems.map(item => {
                return (
                    <LanguageItem
                        key={item.id}
                        barColor={barColor}
                        hidden={item.hidden}
                        languageItem={item}
                    />
                )
            })
        }
        </ul>
    )
}

function EducationItem({educationItem, hidden = false})
{
    if (hidden)
    {
        return <></>
    }
    else
    {
        return (
            <li className="section-item-container">
                <div className="section-item-cell">
                    <p className="section-item-text">{educationItem.start}-{educationItem.end}</p>
                    <p className="section-item-text">{educationItem.location}</p>
                </div>
                <div className="section-item-cell">
                    <p className="section-item-text">{educationItem.degree}</p>
                    <p className="section-item-text">{educationItem.school}</p>
                </div>
            </li>
        )
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
            <li className="language-item-container">
                <p className="language-item-text">{languageItem.name}</p>
                <LevelBar barColor={barColor} hidden={!languageItem.showLevel} level={languageItem.level}/>
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
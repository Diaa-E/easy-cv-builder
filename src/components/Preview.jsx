import "../styles/Preview.css";
import "../styles/layouts/layout_01.css";
import appIcons from "../appIconsBarrel";

import { isBright } from "../utility";

export default function Preview({accentColor, layout = "layout-01", data})
{
    const useDarkText = isBright(accentColor);
    const textColor = useDarkText? "var(--text)" : "var(--main)";
    const secondaryBackgroundColor = useDarkText? "var(--text)" : "var(--main-dark";
    const secondaryColor = useDarkText? accentColor : "var(--text)";

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
                        data.links.map(link => <HeaderItem key={link.id} useBrightIcon={!useDarkText} icon={link.icon} text={link.url} hidden={link.hidden}/>)
                    }
                </div>
            </div>
            <ul className="section education">
                <h2 style={{backgroundColor: secondaryBackgroundColor, color: secondaryColor}} className="section-title">Education</h2>
                {
                    data.education.map(item => <EducationItem key={item.id} hidden={item.hidden} educationItem={item}/>)
                }
            </ul>
            <ul className="section experience">
                <h2 style={{backgroundColor: secondaryBackgroundColor, color: secondaryColor}} className="section-title">Experience</h2>
                {
                    data.experience.map(item => <ExperienceItem key={item.id} hidden={item.hidden} experienceItem={item}/>)
                }
            </ul>
            <ul className="section skills">
                 <h2 style={{backgroundColor: secondaryBackgroundColor, color: secondaryColor}} className="section-title">Skills</h2>
                 {
                    data.skills.map(item => <SkillItem key={item.id} barColor={accentColor} hidden={item.hidden} skillItem={item}/>)
                 }
            </ul>
            <ul className="section languages">
                 <h2 style={{backgroundColor: secondaryBackgroundColor, color: secondaryColor}} className="section-title">Languages</h2>
                 {
                    data.languages.map(item => <LanguageItem key={item.id} barColor={accentColor} hidden={item.hidden} languageItem={item}/>)
                 }
            </ul>
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

function EducationItem({educationItem, hidden = false})
{
    if (hidden)
    {
        return <></>
    }
    else
    {
        return(
            <li>
                <div className="vertical-container">
                    <p>{educationItem.start}-{educationItem.end}</p>
                    <p>{educationItem.location}</p>
                </div>
                <div className="vertical-container">
                    <p>{educationItem.degree}</p>
                    <p>{educationItem.school}</p>
                </div>
            </li>
        )
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
        return(
            <li>
                <div className="vertical-container">
                    <p>{experienceItem.start}-{experienceItem.end}</p>
                    <p>{experienceItem.location}</p>
                </div>
                <div className="vertical-container">
                    <p>{experienceItem.company}</p>
                    <p>{experienceItem.position}</p>
                </div>
                <dir className="vertical-container">
                    <p>{experienceItem.details}</p>
                </dir>
            </li>
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
                <div className="horizontal-cotnainer">
                    <p>{languageItem.name}</p>
                    <LevelBar barColor={barColor} hidden={!languageItem.showLevel} level={languageItem.level}/>
                </div>
            </li>
        )
    }
}

function SkillItem({barColor, skillItem, hidden = false})
{
    if (hidden)
    {
        return <></>
    }
    else
    {
        return (
            <li>
                <div className="horizontal-cotnainer">
                    <p>{skillItem.name}</p>
                    <LevelBar barColor={barColor} hidden={!skillItem.showLevel} level={skillItem.level}/>
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
                <div style={{width: `${+level/10}vw`, backgroundColor: barColor}} className="bar"></div>
            </div>
        )
    }
}
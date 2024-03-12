import "../styles/layouts/Layout_01.css";

import appIcons from "../data/appIconsBarrel";
import linkIcons from "../data/linkIconsBarrel";

import { isBright } from "../utils/utility";
import { isEmptySection } from "../utils/emptySectionDetector";
import { joinString } from "../utils/stringJoiner";

export default function Layout_01({data})
{
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
                    {
                        data.personalInfo.address !== "" &&
                        <HeaderItem brightAccent={brightAccent} text={data.personalInfo.address} icon={appIcons.address}/>
                    }
                    {
                        data.contact.phoneNumber !== "" &&
                        <HeaderItem brightAccent={brightAccent} text={data.contact.phoneNumber} icon={appIcons.contact}/>
                    }
                    {
                        data.contact.email !== "" &&
                        <HeaderItem brightAccent={brightAccent} text={data.contact.email} icon={appIcons.email}/>
                    }
                    {
                        data.personalInfo.zip !== "" &&
                        <HeaderItem brightAccent={brightAccent} text={data.personalInfo.zip} icon={appIcons.zip}/>
                    }
                    {
                        data.links.map(link => {

                            return (
                                !link.hidden &&
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
            {
                data.order === "educationFirst" ? (
                    <>
                        <EducationSection
                            secondaryColor={secondaryColor}
                            backgroundColor={secondaryBackgroundColor}
                            educationItems={data.education}
                        />
                        <ExperienceSection
                            secondaryColor={secondaryColor}
                            backgroundColor={secondaryBackgroundColor}
                            experienceItems={data.experience}
                        />
                    </>
                ) : (
                    <>
                        <ExperienceSection
                            secondaryColor={secondaryColor}
                            backgroundColor={secondaryBackgroundColor}
                            experienceItems={data.experience}
                        />
                        <EducationSection
                            secondaryColor={secondaryColor}
                            backgroundColor={secondaryBackgroundColor}
                            educationItems={data.education}
                        />
                    </>
                )
            }
            <div className="bottom-wrapper">
                <SkillsSection
                    accentColor={data.accentColor}
                    secondaryColor={secondaryColor}
                    backgroundColor={secondaryBackgroundColor}
                    skillsItems={data.skills}
                />
                <LanguagesSection
                    accentColor={data.accentColor}
                    secondaryColor={secondaryColor}
                    backgroundColor={secondaryBackgroundColor}
                    languageItems={data.languages}
                />
            </div>
        </div>
    )
}

function LanguagesSection({accentColor, backgroundColor, secondaryColor, languageItems})
{
    if (isEmptySection(languageItems)) return <></>

    return (
        <div className="section-wrapper">
            <h3 
                style={{backgroundColor: backgroundColor, color: secondaryColor}}
                className="section-title"
            >Languages</h3>
            <div className="flow-wrapper">
            {
                languageItems.map(item => {
                    
                    return (
                        !item.hidden &&
                        <div key={item.id} className="flow-item">
                            <p className="section-text">{item.name}</p>
                            {
                                item.showLevel &&
                                <LevelBar accentColor={accentColor} level={item.level}/>
                            }
                        </div>
                    )
                })
            }
            </div>
        </div>
    )
}

function SkillsSection({accentColor, backgroundColor, secondaryColor, skillsItems})
{
    if (isEmptySection(skillsItems)) return <></>

    return (
        <div className="section-wrapper">
            <h3 
                style={{backgroundColor: backgroundColor, color: secondaryColor}}
                className="section-title"
            >Skills</h3>
            <div className="flow-wrapper">
            {
                skillsItems.map(item => {
                    
                    return (
                        !item.hidden &&
                        <div key={item.id} className="flow-item">
                            <p className="section-text">{item.name}</p>
                            {
                                item.showLevel &&
                                <LevelBar accentColor={accentColor} level={item.level}/>
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

function ExperienceSection({backgroundColor, secondaryColor, experienceItems})
{
    if (isEmptySection(experienceItems)) return <></>

    return (
        <div className="section-wrapper wide">
            <h3 
                style={{backgroundColor: backgroundColor, color: secondaryColor}}
                className="section-title"
            >Experience</h3>
            {
                experienceItems.map(item => {

                    return (
                        !item.hidden &&
                        <div key={item.id} className="section-item">
                        {
                            (item.end !== "" || item.start !== "") &&
                            <p className="section-text">{joinString([item.start, item.end], "-")}</p>
                        }
                        {
                            (item.position !== "")&&
                            <p className="section-text">{item.position}</p>
                        }
                        {
                            (item.location !== "" || item.company !== "" ) &&
                            <p className="section-text">{joinString([item.company, item.location], ", ")}</p>
                        }
                        {
                            (item.details !== "") &&
                            <p className="section-text">{item.details}</p>
                        }
                        </div>
                    )
                })
            }
        </div>
    )
}

function EducationSection({backgroundColor, secondaryColor, educationItems})
{
    if (isEmptySection(educationItems)) return <></>;

    return (
        <div className="section-wrapper wide">
            <h3 
                style={{backgroundColor: backgroundColor, color: secondaryColor}}
                className="section-title"
            >Education</h3>
            {
                educationItems.map(item => {

                    return (
                        !item.hidden &&
                        <div key={item.id} className="section-item">
                        {
                            (item.end !== "" || item.start !== "") &&
                            <p className="section-text">{joinString([item.start, item.end], ", ")}</p>
                        }
                        {
                            (item.degree !== "") &&
                            <p className="section-text">{item.degree}</p>
                        }
                        {
                            (item.school !== "" || item.location !== "") &&
                            <p className="section-text">{joinString([item.school, item.location], ", ")}</p>
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
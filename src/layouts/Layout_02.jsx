import "../styles/layouts/Layout_02.css";

import appIcons from "../data/appIconsBarrel";
import linkIcons from "../data/linkIconsBarrel";

import { isBright } from "../utils/utility";
import { isEmptySection } from "../utils/emptySectionDetector";
import { joinString } from "../utils/stringJoiner";
import { calculateTextLevel } from "../utils/calculateTextLevel";
import { languageLevels, skillLevels } from "../data/textLevelTemplates";

export default function Layout_02({data})
{
    const useDarkText = isBright(data.accentColor);
    const textColor = useDarkText ? "var(--black)" : "var(--white)";
    const iconColor = useDarkText ? "invert(0)" : "invert(1)";

    return (
        <div style={{fontFamily: data.font}} className="preview layout-02">
            <div className="left">
                <div style={{backgroundColor: data.accentColor}} className="header-wrapper">
                    <h1 style={{color: textColor}} className="name">{data.personalInfo.fullName}</h1>
                    <h2 style={{color: textColor}} className="profession">{data.personalInfo.profession}</h2>
                    <div style={{borderBottom: `solid calc(var(--width) * .002) ${textColor}`}} className="seperator"></div>
                    <div className="header-items-wrapper">
                        {
                            data.personalInfo.address !== "" &&
                            <HeaderItem textColor={textColor} iconColor={iconColor} icon={appIcons.address} text={data.personalInfo.address}/>
                        }
                        {
                            data.contact.phoneNumber !== "" &&
                            <HeaderItem textColor={textColor} iconColor={iconColor} icon={appIcons.contact} text={data.contact.phoneNumber}/>
                        }
                        {
                            data.contact.email !== "" &&
                            <HeaderItem textColor={textColor} iconColor={iconColor} icon={appIcons.email} text={data.contact.email}/>
                        }
                        {
                            data.personalInfo.zip !== "" &&
                            <HeaderItem textColor={textColor} iconColor={iconColor} icon={appIcons.zip} text={data.personalInfo.zip}/>
                        }
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
                    <LanguagesSection accentColor={data.accentColor} iconColor={iconColor} data={data}/>
            </div>
            <div className="right">
                {
                    data.order === "educationFirst" ? (
                        <>
                            <EducationSection accentColor={data.accentColor} iconColor={iconColor} educationITems={data.education}/>
                            <ExperienceSection accentColor={data.accentColor} iconColor={iconColor} experienceItems={data.experience}/>
                        </>
                    ) : (
                        <>
                            <ExperienceSection accentColor={data.accentColor} iconColor={iconColor} experienceItems={data.experience}/>
                            <EducationSection accentColor={data.accentColor} iconColor={iconColor} educationITems={data.education}/>
                        </>
                    )
                }
                <SkillsSection accentColor={data.accentColor} iconColor={iconColor} data={data}/>
            </div>
        </div>
    )

    function SkillsSection({accentColor, iconColor, data})
    {
        return (
            !isEmptySection(data.skills) &&
            <div className="section-wrapper">
                <h3 className="section-title">
                    <div className="section-icon-wrapper" style={{backgroundColor: accentColor}}>
                        <img style={{filter: iconColor}} className="section-icon" src={appIcons.skills} alt="" />
                    </div>
                    Skills
                </h3>
                <div className="seperator"></div>
                <div className="flow-wrapper">
                {
                    data.skills.map(item => {
                        
                        return (
                            !item.hidden &&
                            <div key={item.id} className="flow-item">
                                <p className="section-text">{item.name}</p>
                                {
                                    item.showLevel &&
                                    <>
                                        {
                                            data.levelMode === "bar" &&
                                            <LevelBar level={item.level} accentColor={accentColor}/>
                                        }
                                        {
                                            data.levelMode === "text" &&
                                            <p className="section-text level-text" >{`(${calculateTextLevel(skillLevels, item.level)})`}</p>
                                        }
                                    </>
                                }
                            </div>
                        )
                    })
                }
                </div>
            </div>
        )
    }

    function ExperienceSection({accentColor, iconColor, experienceItems})
    {
        return (
            !isEmptySection(experienceItems) &&
            <div className="section-wrapper">
                <h3 className="section-title">
                    <div className="section-icon-wrapper" style={{backgroundColor: accentColor}}>
                        <img style={{filter: iconColor}} className="section-icon" src={appIcons.experience} alt="" />
                    </div>
                    Experience
                </h3>
                <div className="seperator"></div>
                {
                    experienceItems.map(item => {
                        return(
                            !item.hidden &&
                            <div key={item.id} className="section-item">
                            {
                                (item.start !== "" || item.end !== "" || item.position !== "" || item.company) &&
                                <p className="section-text">
                                    <span className="bold">{joinString([item.position, item.company], ", ")}</span>
                                    <br></br>
                                    {joinString([item.start, item.end], "-")}
                                </p>
                            }
                            {
                                (item.location !== "") &&
                                <p className="section-text">
                                    {item.location}
                                </p>
                            }
                            {
                                (item.details !== "") &&
                                <p className="section-text">
                                    {item.details}
                                </p>
                            }
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    function EducationSection({accentColor, iconColor, educationITems})
    {
        return (
            !isEmptySection(educationITems) &&
            <div className="section-wrapper">
                <h3 className="section-title">
                    <div className="section-icon-wrapper" style={{backgroundColor: accentColor}}>
                        <img style={{filter: iconColor}} className="section-icon" src={appIcons.education} alt="" />
                    </div>
                    Education
                </h3>
                <div className="seperator"></div>
                {
                    educationITems.map(item => {
                        return(
                            !item.hidden &&
                            <div key={item.id} className="section-item">
                            {
                                (item.start !== "" || item.end !== "") &&
                                <p className="section-text">
                                    {joinString([item.start, item.end], "-")}
                                </p>
                            }
                            {
                                (item.degree !== "") &&
                                <p className="section-text">
                                    <span className="bold">{item.degree}</span>
                                </p>
                            }
                            {
                                (item.location !== "" || item.school !== "") &&
                                <p className="section-text">
                                    {joinString([item.school, item.location], ", ")}
                                </p>
                            }
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    function LanguagesSection({accentColor, iconColor, data})
    {
        return (
            !isEmptySection(data.languages) &&
            <div className="section-wrapper">
                <h3 className="section-title">
                    <div className="section-icon-wrapper" style={{backgroundColor: accentColor}}>
                        <img style={{filter: iconColor}} className="section-icon" src={appIcons.languages} alt="" />
                    </div>
                    Languages
                </h3>
                <div className="seperator"></div>
                <div className="flow-wrapper">
                {
                    data.languages.map(item => {
                        
                        return (
                            !item.hidden &&
                            <div key={item.id} className="flow-item">
                                <p className="section-text">{item.name}</p>
                                {
                                    item.showLevel &&
                                    <>
                                        {
                                            data.levelMode === "bar" &&
                                            <LevelBar level={item.level} accentColor={accentColor}/>
                                        }
                                        {
                                            data.levelMode === "text" &&
                                            <p className="section-text level-text" >{`(${calculateTextLevel(languageLevels, item.level)})`}</p>
                                        }
                                    </>
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
import styles from "../styles/layouts/Layout_01.module.css";

import appIcons from "../data/appIconsBarrel";
import linkIcons from "../data/linkIconsBarrel";

import { isBright } from "../utils/utility";
import { isEmptySection } from "../utils/emptySectionDetector";
import { joinString } from "../utils/stringJoiner";
import { calculateTextLevel } from "../utils/calculateTextLevel";
import { languageLevels, skillLevels } from "../data/textLevelTemplates";

export default function Layout_01({data})
{
    const brightAccent = isBright(data.accentColor);
    const textColor = brightAccent? "var(--black)" : "var(--white)";
    const secondaryBackgroundColor = brightAccent? "var(--black)" : data.accentColor;
    const secondaryColor = brightAccent? data.accentColor : "var(--white)";
   
    return (
        <div style={{fontFamily: data.font}} className={styles["layout-01"]}>
            <div style={{backgroundColor: data.accentColor}} className={styles["header-wrapper"]}>
                <h1 style={{color: textColor}} className={styles["name"]}>{data.personalInfo.fullName}</h1>
                <h2 style={{color: textColor}} className={styles["profession"]}>{data.personalInfo.profession}</h2>
                <div className={styles["header-items-wrapper"]}>
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
            <div className={styles["bottom-wrapper"]}>
                <SkillsSection
                    accentColor={data.accentColor}
                    secondaryColor={secondaryColor}
                    backgroundColor={secondaryBackgroundColor}
                    data={data}
                />
                <LanguagesSection
                    accentColor={data.accentColor}
                    secondaryColor={secondaryColor}
                    backgroundColor={secondaryBackgroundColor}
                    data={data}
                />
            </div>
        </div>
    )
}

function LanguagesSection({accentColor, backgroundColor, secondaryColor, data})
{
    if (isEmptySection(data.languages)) return <></>

    return (
        <div className={styles["section-wrapper"]}>
            <h3 
                style={{backgroundColor: backgroundColor, color: secondaryColor}}
                className={styles["section-title"]}
            >Languages</h3>
            <div className={styles["flow-wrapper"]}>
            {
                data.languages.map(item => {
                    
                    return (
                        !item.hidden &&
                        <div key={item.id} className={styles["flow-item"]}>
                            <p className={styles["section-text"]}>{item.name}</p>
                            {
                                item.showLevel &&
                                <>
                                    {
                                        data.levelMode === "bar" &&
                                        <LevelBar accentColor={accentColor} level={item.level}/>
                                    }
                                    {
                                        data.levelMode === "text" &&
                                        <p
                                            className={[styles["section-text"], styles["level-text"]].join(" ")}
                                        >
                                            {`(${calculateTextLevel(languageLevels, item.level)})`}
                                        </p>
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

function SkillsSection({accentColor, backgroundColor, secondaryColor, data})
{
    if (isEmptySection(data.skills)) return <></>

    return (
        <div className={styles["section-wrapper"]}>
            <h3 
                style={{backgroundColor: backgroundColor, color: secondaryColor}}
                className={styles["section-title"]}
            >Skills</h3>
            <div className={styles["flow-wrapper"]}>
            {
                data.skills.map(item => {
                    
                    return (
                        !item.hidden &&
                        <div key={item.id} className={styles["flow-item"]}>
                            <p className={styles["section-text"]}>{item.name}</p>
                            {
                                item.showLevel &&
                                <>
                                    {
                                        data.levelMode === "bar" &&
                                        <LevelBar accentColor={accentColor} level={item.level}/>
                                    }
                                    {
                                        data.levelMode === "text" &&
                                        <p
                                            className={[styles["section-text"], styles["level-text"]].join(" ")}
                                        >
                                            {`(${calculateTextLevel(skillLevels, item.level)})`}
                                        </p>
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
        <div className={styles["level-container"]}>
            <span style={{width: level + "%", backgroundColor: accentColor}} className={styles["level"]}></span>
        </div>
    )
}

function ExperienceSection({backgroundColor, secondaryColor, experienceItems})
{
    if (isEmptySection(experienceItems)) return <></>

    return (
        <div className={[styles["section-wrapper"], styles["wide"]].join(" ")}>
            <h3 
                style={{backgroundColor: backgroundColor, color: secondaryColor}}
                className={styles["section-title"]}
            >Experience</h3>
            {
                experienceItems.map(item => {

                    return (
                        !item.hidden &&
                        <div key={item.id} className={styles["section-item"]}>
                        {
                            (item.end !== "" || item.start !== "") &&
                            <p className={styles["section-text"]}>{joinString([item.start, item.end], "-")}</p>
                        }
                        {
                            (item.position !== "")&&
                            <p className={styles["section-text"]}>{item.position}</p>
                        }
                        {
                            (item.location !== "" || item.company !== "" ) &&
                            <p className={styles["section-text"]}>{joinString([item.company, item.location], ", ")}</p>
                        }
                        {
                            (item.details !== "") &&
                            <p className={styles["section-text"]}>{item.details}</p>
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
        <div className={[styles["section-wrapper"], styles["wide"]].join(" ")}>
            <h3 
                style={{backgroundColor: backgroundColor, color: secondaryColor}}
                className={styles["section-title"]}
            >Education</h3>
            {
                educationItems.map(item => {

                    return (
                        !item.hidden &&
                        <div key={item.id} className={styles["section-item"]}>
                        {
                            (item.end !== "" || item.start !== "") &&
                            <p className={styles["section-text"]}>{joinString([item.start, item.end], ", ")}</p>
                        }
                        {
                            (item.degree !== "") &&
                            <p className={styles["section-text"]}>{item.degree}</p>
                        }
                        {
                            (item.school !== "" || item.location !== "") &&
                            <p className={styles["section-text"]}>{joinString([item.school, item.location], ", ")}</p>
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
        <div className={styles["header-item"]}>
            <img style={{filter: brightAccent ? "" : "invert(1)"}} className={styles["header-item-icon"]} src={icon} alt="" />
            <p style={{color: brightAccent ? "var(--black)" : "var(--white)"}} className={styles["header-item-text"]}>{text}</p>
        </div>
    )
}
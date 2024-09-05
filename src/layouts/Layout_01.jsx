import styles from "../styles/layouts/Layout_01.module.css";

import appIcons from "../data/appIconsBarrel";
import linkIcons from "../data/linkIconsBarrel";

import { isBright } from "../utils/utility";
import { isEmptySection } from "../utils/emptySectionDetector";
import { joinString } from "../utils/stringJoiner";
import { calculateTextLevel } from "../utils/calculateTextLevel";
import { languageLevels, skillLevels } from "../data/textLevelTemplates";
import { useEffect, useState } from "react";

export default function Layout_01({data})
{
    const [cssVariables, setCssVariables] = useState();

    useEffect(() => {

        const brightAccent = isBright(data.accentColor);

        setCssVariables({
            "--background": `${data.accentColor}`,
            "--background-2": brightAccent ? "var(--black)" : data.accentColor,
            "--text-color": brightAccent ? "var(--black)" : "var(--white)",
            "--text-color-2": brightAccent ? data.accentColor : "var(--white)",
            "--icon-filter": brightAccent ? "invert(0)" : "invert(1)",
        });
        
    }, [data.accentColor]);
   
    return (
        <div style={{...cssVariables, fontFamily: data.font}} className={styles["layout-01"]}>
            <div className={styles["header-wrapper"]}>
                <h1 className={styles["name"]}>{data.personalInfo.fullName}</h1>
                <h2 className={styles["profession"]}>{data.personalInfo.profession}</h2>
                <div className={styles["header-items-wrapper"]}>
                    {
                        data.personalInfo.address !== "" &&
                        <HeaderItem text={data.personalInfo.address} icon={appIcons.address}/>
                    }
                    {
                        data.contact.phoneNumber !== "" &&
                        <HeaderItem text={data.contact.phoneNumber} icon={appIcons.contact}/>
                    }
                    {
                        data.contact.email !== "" &&
                        <HeaderItem text={data.contact.email} icon={appIcons.email}/>
                    }
                    {
                        data.personalInfo.zip !== "" &&
                        <HeaderItem text={data.personalInfo.zip} icon={appIcons.zip}/>
                    }
                    {
                        data.links.map(link => {

                            return (
                                !link.hidden &&
                                <HeaderItem 
                                    key={link.id}
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
                            educationItems={data.education}
                        />
                        <ExperienceSection
                            experienceItems={data.experience}
                        />
                    </>
                ) : (
                    <>
                        <ExperienceSection
                            experienceItems={data.experience}
                        />
                        <EducationSection
                            educationItems={data.education}
                        />
                    </>
                )
            }
            <div className={styles["bottom-wrapper"]}>
                <SkillsSection
                    data={data}
                />
                <LanguagesSection
                    data={data}
                />
            </div>
        </div>
    )
}

function LanguagesSection({data})
{
    if (isEmptySection(data.languages)) return <></>

    return (
        <div className={styles["section-wrapper"]}>
            <h3 
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
                                        <LevelBar level={item.level}/>
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

function SkillsSection({data})
{
    if (isEmptySection(data.skills)) return <></>

    return (
        <div className={styles["section-wrapper"]}>
            <h3 
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
                                        <LevelBar level={item.level}/>
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

function LevelBar({level})
{
    return (
        <div className={styles["level-container"]}>
            <span style={{"--level-width": `${level}%`}} className={styles["level"]}></span>
        </div>
    )
}

function ExperienceSection({experienceItems})
{
    if (isEmptySection(experienceItems)) return <></>

    return (
        <div className={[styles["section-wrapper"], styles["wide"]].join(" ")}>
            <h3 
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

function EducationSection({educationItems})
{
    if (isEmptySection(educationItems)) return <></>;

    return (
        <div className={[styles["section-wrapper"], styles["wide"]].join(" ")}>
            <h3 
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

function HeaderItem({icon, text})
{
    return (
        <div className={styles["header-item"]}>
            <img className={styles["header-item-icon"]} src={icon} alt="" />
            <p className={styles["header-item-text"]}>{text}</p>
        </div>
    )
}
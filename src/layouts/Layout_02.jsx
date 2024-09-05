import styles from "../styles/layouts/Layout_02.module.css";

import appIcons from "../data/appIconsBarrel";
import linkIcons from "../data/linkIconsBarrel";

import { isBright } from "../utils/utility";
import { isEmptySection } from "../utils/emptySectionDetector";
import { joinString } from "../utils/stringJoiner";
import { calculateTextLevel } from "../utils/calculateTextLevel";
import { languageLevels, skillLevels } from "../data/textLevelTemplates";

export default function Layout_02({data})
{
    const brightAccent = isBright(data.accentColor);

    const cssVariables = {
        "--background": data.accentColor,
        "--text-color": brightAccent ? "var(--black)" : "var(--white)",
        "--icon-filter": brightAccent ? "invert(0)" : "invert(1)",
        "--font": data.font
    };

    return (
        <div style={cssVariables} className={styles["layout-02"]}>
            <div className={styles["left"]}>
                <div className={styles["header-wrapper"]}>
                    <h1 className={styles["name"]}>{data.personalInfo.fullName}</h1>
                    <h2 className={styles["profession"]}>{data.personalInfo.profession}</h2>
                    <div className={styles["seperator"]}></div>
                    <div className={styles["header-items-wrapper"]}>
                        {
                            data.personalInfo.address !== "" &&
                            <HeaderItem icon={appIcons.address} text={data.personalInfo.address}/>
                        }
                        {
                            data.contact.phoneNumber !== "" &&
                            <HeaderItem icon={appIcons.contact} text={data.contact.phoneNumber}/>
                        }
                        {
                            data.contact.email !== "" &&
                            <HeaderItem icon={appIcons.email} text={data.contact.email}/>
                        }
                        {
                            data.personalInfo.zip !== "" &&
                            <HeaderItem icon={appIcons.zip} text={data.personalInfo.zip}/>
                        }
                        {
                            data.links.map(item => {

                                return (
                                    !item.hidden &&
                                    <HeaderItem
                                        key={item.id}
                                        icon={linkIcons.find(icon => icon.name === item.icon).icon}
                                        text={item.url}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
                    <LanguagesSection data={data}/>
            </div>
            <div className={styles["right"]}>
                {
                    data.order === "educationFirst" ? (
                        <>
                            <EducationSection educationITems={data.education}/>
                            <ExperienceSection experienceItems={data.experience}/>
                        </>
                    ) : (
                        <>
                            <ExperienceSection experienceItems={data.experience}/>
                            <EducationSection educationITems={data.education}/>
                        </>
                    )
                }
                <SkillsSection data={data}/>
            </div>
        </div>
    )

    function SkillsSection({data})
    {
        return (
            !isEmptySection(data.skills) &&
            <div className={styles["section-wrapper"]}>
                <h3 className={styles["section-title"]}>
                    <div className={styles["section-icon-wrapper"]}>
                        <img className={styles["section-icon"]} src={appIcons.skills} alt="" />
                    </div>
                    Skills
                </h3>
                <div className={styles["seperator-body"]}></div>
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

    function ExperienceSection({experienceItems})
    {
        return (
            !isEmptySection(experienceItems) &&
            <div className={styles["section-wrapper"]}>
                <h3 className={styles["section-title"]}>
                    <div className={styles["section-icon-wrapper"]}>
                        <img className={styles["section-icon"]} src={appIcons.experience} alt="" />
                    </div>
                    Experience
                </h3>
                <div className={styles["seperator-body"]}></div>
                {
                    experienceItems.map(item => {
                        return(
                            !item.hidden &&
                            <div key={item.id} className={styles["section-item"]}>
                            {
                                (item.start !== "" || item.end !== "" || item.position !== "" || item.company) &&
                                <p className={styles["section-text"]}>
                                    <span className={styles["bold"]}>{joinString([item.position, item.company], ", ")}</span>
                                    <br></br>
                                    {joinString([item.start, item.end], "-")}
                                </p>
                            }
                            {
                                (item.location !== "") &&
                                <p className={styles["section-text"]}>
                                    {item.location}
                                </p>
                            }
                            {
                                (item.details !== "") &&
                                <p className={styles["section-text"]}>
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

    function EducationSection({educationITems})
    {
        return (
            !isEmptySection(educationITems) &&
            <div className={styles["section-wrapper"]}>
                <h3 className={styles["section-title"]}>
                    <div className={styles["section-icon-wrapper"]}>
                        <img className={styles["section-icon"]} src={appIcons.education} alt="" />
                    </div>
                    Education
                </h3>
                <div className={styles["seperator-body"]}></div>
                {
                    educationITems.map(item => {
                        return(
                            !item.hidden &&
                            <div key={item.id} className={styles["section-item"]}>
                            {
                                (item.start !== "" || item.end !== "") &&
                                <p className={styles["section-text"]}>
                                    {joinString([item.start, item.end], "-")}
                                </p>
                            }
                            {
                                (item.degree !== "") &&
                                <p className={styles["section-text"]}>
                                    <span className={styles["bold"]}>{item.degree}</span>
                                </p>
                            }
                            {
                                (item.location !== "" || item.school !== "") &&
                                <p className={styles["section-text"]}>
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

    function LanguagesSection({data})
    {
        return (
            !isEmptySection(data.languages) &&
            <div className={styles["section-wrapper"]}>
                <h3 className={styles["section-title"]}>
                    <div className={styles["section-icon-wrapper"]}>
                        <img className={styles["section-icon"]} src={appIcons.languages} alt="" />
                    </div>
                    Languages
                </h3>
                <div className={styles["seperator-body"]}></div>
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

    function LevelBar({level})
{
    return (
        <div className={styles["level-container"]}>
            <span style={{"--level-width": `${level}%`}} className={styles["level"]}></span>
        </div>
    )
}

    function HeaderItem({text, icon})
    {
        return (
            <div className={styles["header-item"]}>
                <img className={styles["header-item-icon" ]}src={icon} alt="" />
                <p className={styles["header-item-text"]}>{text}</p>
            </div>
        )
    }
}
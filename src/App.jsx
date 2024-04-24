import { createContext, useEffect, useReducer, useState } from 'react';

import logo from "./assets/images/logo.svg";
import appIcons from './data/appIconsBarrel';

import NavItem from './components/NavItem';
import FormButton from './components/FormButton';

import styles from './styles/App.module.css';
import PersonalInformation from './pages/PersonalInformation';
import Contact from './pages/Contact';
import sampleInfo from './data/sampleInfo';
import { tabs } from './data/tabs';
import Education from './pages/Education';
import Experience from './pages/Experience';
import Links from './pages/Links';
import Skills from './pages/Skills';
import Languages from './pages/Languages';
import Settings from './pages/Settings';
import Save from './pages/Save';
import About from './pages/About';

import { testDraftValidity } from './utils/draftValidation';
import DarkModeButton from './components/DarkModeButton';
import ConfirmDialog from './components/ConfirmDialog';
import { fixDraft } from './utils/fixDraft';
import { meta } from './data/meta';
import Preview from './components/Preview';
import reduceList from './utils/listReducer';
import reduceDialog from './utils/dialogReducer';

export const ScreenWidthContext = createContext(null);
export const DialogContext = createContext(null);

function App({rootClass}) {

  const [darkMode, setDarkMode] = useState(Boolean(JSON.parse(localStorage.getItem("darkMode"))));
  const [currentTab, setCurrentTab] = useState(tabs.personalInfo);
  const [personalInfo, setPersonalInfo] = useState(getSessionData("personalInfo", sampleInfo.personalInfo));
  const [contact, setContact] = useState(getSessionData("contact", sampleInfo.contact));
  const [education, dispatchEducation] = useReducer(reduceList, null, () => getSessionData("education", sampleInfo.education));
  const [experience, dispatchExperience] = useReducer(reduceList, null, () => getSessionData("experience", sampleInfo.experience));
  const [links, dispatchLinks] = useReducer(reduceList, null, () => getSessionData("links", sampleInfo.links));
  const [skills, dispatchSkills] = useReducer(reduceList, null, () => getSessionData("skills", sampleInfo.skills));
  const [languages, dispatchLanguages] = useReducer(reduceList, null, () => getSessionData("languages", sampleInfo.languages));
  const [accentColor, setAccentColor] = useState(getSessionData("accentColor", sampleInfo.accentColor));
  const [font, setFont] = useState(getSessionData("font", sampleInfo.font));
  const [layout, setLayout] = useState(getSessionData("layout", sampleInfo.layout));
  const [order, setOrder] = useState(getSessionData("order", sampleInfo.order));
  const [levelMode, setLevelMOde] = useState(getSessionData("levelMode", sampleInfo.levelMode));
  const [draftStatus, setDraftStatus] = useState({code: 4, errorLog: []}); //code key is used to determine error panel text and color in Save component
  const [dialogState, dispatchDialog] = useReducer(reduceDialog, null, () => {
    return {
      open: false,
      actionText: "",
      prompt: "",
      danger: false,
      onConfirm: () => {},
    }
  });
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {

    window.addEventListener("resize", () => {
      
      setScreenWidth(window.innerWidth);
    });

    window.addEventListener("scroll", () => {
      
      dispatchDialog({type: "close"});
    });

    return () => {

      removeEventListener("resize", window);
      removeEventListener("scroll", window);
    }
  }, []);

  useEffect(() => {

    sessionStorage.setItem("data", JSON.stringify(data));

    return () => {};

  }, [education, personalInfo, contact, experience, links, skills, languages, accentColor, font, layout, order, levelMode]);

  useEffect(() => {

    document.body.classList.remove(darkMode ? styles["light"] : styles["dark"]);
    document.body.classList.add(darkMode ? styles["dark"] : styles["light"]);

    return () => {};

  }, [darkMode]);

  const emptyListText = "Nothing here yet."

  const data={
    personalInfo: personalInfo,
    contact: contact,
    links: links,
    education: education,
    experience: experience,
    skills: skills,
    languages: languages,
    font: font,
    accentColor: accentColor,
    layout: layout,
    order: order,
    levelMode: levelMode
  };

  function getSessionData(key, defaultValue)
  {
    if (!Boolean(JSON.parse(sessionStorage.getItem("data")))) return defaultValue;

    return JSON.parse(sessionStorage.getItem("data"))[key];
  }

  async function uploadDraft(e)
  {
    setDraftStatus({code: 1, errorLog: []});
    const file = e.target.files[0]
    e.target.value = null;
    const Jsondraft = await file.text();
    const draft = JSON.parse(Jsondraft);
    const errorLog = testDraftValidity(draft);

    if (errorLog.length > 0)
    {
      setDraftStatus({code: 2, errorLog: errorLog});
      dispatchDialog({
        type: "openDefault",
        prompt: `The *${errorLog.join(", ")}* section${errorLog.length > 1 ? "s" : ""} 
        of the draft ${errorLog.length > 1 ? "are" : "is"} *invalid*, do you want to 
        replace ${errorLog.length > 1 ? "them" : "it"} with default values?`,
        actionText: "Fix Draft",
        onConfirm: () => {
          fixDraft(draft, errorLog, sampleInfo);
          loadDraft(draft);
        }
      });
      return;
    }

    loadDraft(draft)
  }

  function loadDraft(draft)
  {
    setDraftStatus({code: 0, errorLog: []});

    setAccentColor(draft.accentColor);
    setFont(draft.font);
    setContact(draft.contact);
    setPersonalInfo(draft.personalInfo);
    dispatchEducation({type: "reset", defaultList: draft.education});
    dispatchExperience({type: "reset", defaultList: draft.experience});
    dispatchLinks({type: "reset", defaultList: draft.links});
    dispatchSkills({type: "reset", defaultList: draft.skills});
    dispatchLanguages({type: "reset", defaultList: draft.languages});
    setLayout(draft.layout);
    setOrder(draft.order);
    setLevelMOde(draft.levelMode);
  }

  function downloadDraft()
  {
    const a = document.createElement("a");
    const downloadData = new Blob([JSON.stringify({version: meta.version, ...data})]);
    a.href = window.URL.createObjectURL(downloadData, {type: "application/json"});
    a.download = "CV_draft.json";
    a.click();
  }

  function resetAll()
  {
    setPersonalInfo(sampleInfo.personalInfo);
    setContact(sampleInfo.contact);
    dispatchEducation({type: "reset", defaultList: sampleInfo.education});
    dispatchExperience({type: "reset", defaultList: sampleInfo.experience});
    dispatchLanguages({type: "reset", defaultList: sampleInfo.languages});
    dispatchSkills({type: "reset", defaultList: sampleInfo.skills});
    dispatchLinks({type: "reset", defaultList: sampleInfo.links});
    setLayout(sampleInfo.layout);
    setAccentColor(sampleInfo.accentColor);
    setFont(sampleInfo.font);
    setOrder(sampleInfo.order);
    setLevelMOde(sampleInfo.levelMode);
  }

  function clearAll()
  {
    setPersonalInfo({
      fullName: "",
      profession: "",
      address: "",
      zip: ""
    });
    setContact({
      phoneNumber: "",
      email: "",
    });
    dispatchEducation({type: "deleteAll"});
    dispatchExperience({type: "deleteAll"});
    dispatchLinks({type: "deleteAll"});
    dispatchSkills({type: "deleteAll"});
    dispatchLanguages({type: "deleteAll"});
  }

  function print()
  {
    window.print()
  }

  return (
    <div className={rootClass}>
      <img src={logo} alt="Easy CV builder's logo" className={styles['logo']} />

      <nav>
        <ul className={styles['nav']}>
          <DarkModeButton darkMode={darkMode} onClick={() => {
            setDarkMode(darkMode => !darkMode);
            localStorage.setItem("darkMode", JSON.stringify(!darkMode));
          }}/>
          <NavItem
            iconUrl={appIcons.personalInfo}
            title={tabs.personalInfo}
            selected={currentTab === tabs.personalInfo}
            onClick={() => setCurrentTab(tabs.personalInfo)}
          />
          <NavItem
            iconUrl={appIcons.contact}
            title={tabs.contact}
            selected={currentTab === tabs.contact}
            onClick={() => setCurrentTab(tabs.contact)}
          />
          <NavItem
            iconUrl={appIcons.link}
            title={tabs.links}
            selected={currentTab === tabs.links}
            onClick={() => setCurrentTab(tabs.links)}
          />
          <NavItem
            iconUrl={appIcons.education}
            title={tabs.education}
            selected={currentTab === tabs.education}
            onClick={() => setCurrentTab(tabs.education)}
          />
          <NavItem
            iconUrl={appIcons.experience}
            title={tabs.experience}
            selected={currentTab === tabs.experience}
            onClick={() => setCurrentTab(tabs.experience)}
          />
          <NavItem
            iconUrl={appIcons.skills}
            title={tabs.skills}
            selected={currentTab === tabs.skills}
            onClick={() => setCurrentTab(tabs.skills)}
          />
          <NavItem
            iconUrl={appIcons.languages}
            title={tabs.languages}
            selected={currentTab === tabs.languages}
            onClick={() => setCurrentTab(tabs.languages)}
          />
          <NavItem
            iconUrl={appIcons.settings}
            title={tabs.settings}
            selected={currentTab === tabs.settings}
            onClick={() => setCurrentTab(tabs.settings)}
          />
          <NavItem
            iconUrl={appIcons.save}
            title={tabs.save}
            selected={currentTab === tabs.save}
            onClick={() => setCurrentTab(tabs.save)}
          />
          <NavItem
            iconUrl={appIcons.about}
            title={tabs.about}
            selected={currentTab === tabs.about}
            onClick={() => setCurrentTab(tabs.about)}
          />
        </ul>
      </nav>
      <div className={styles["editor"]}>
        <h1 className={styles['editor-title']}>{currentTab}</h1>
        <DialogContext.Provider value={dispatchDialog}>
          {
            currentTab === tabs.personalInfo &&
            <PersonalInformation
              personalInfo={personalInfo}
              setPersonalInfo={setPersonalInfo}
            />
          }
          {
            currentTab === tabs.contact &&
            <Contact
              contact={contact}
              setContact={setContact}
            />
          }
          <ScreenWidthContext.Provider value={{screenWidth: screenWidth}}>
            {
              currentTab === tabs.education &&
              <Education
                educationItems={education}
                dispatchEducation = {dispatchEducation}
                setDialogState={dispatchDialog}
                emptyText={emptyListText}
              />
            }
            {
              currentTab === tabs.experience &&
              <Experience
                experienceItems={experience}
                dispatchExperience={dispatchExperience}
                setDialogState={dispatchDialog}
                emptyText={emptyListText}
              />
            }
            {
              currentTab === tabs.links &&
              <Links
                linksItems={links}
                dispatchLinks={dispatchLinks}
                emptyText={emptyListText}
              />
            }
            {
              currentTab === tabs.skills &&
              <Skills
                levelMode={levelMode}
                skillsItems={skills}
                dispatchSkills={dispatchSkills}
                emptyText={emptyListText}
              />
            }
            {
              currentTab === tabs.languages &&
              <Languages
                levelMode={levelMode}
                languagesItems={languages}
                dispatchLanguages={dispatchLanguages}
                setDialogState={dispatchDialog}
                emptyText={emptyListText}
              />
            }
          </ScreenWidthContext.Provider>
          {
            currentTab === tabs.settings &&
            <Settings
              color={accentColor}
              updateColor={(e) => setAccentColor(e.target.value)}
              font={font}
              updateFont={(e) => setFont(e.target.value)}
              layout={layout}
              updateLayout={(e) => setLayout(e.target.value)}
              order={order}
              setOrder={(e) => setOrder(e.target.value)}
              levelMode={levelMode}
              setLevelMode={(e) => setLevelMOde(e.target.value)}
            />
          }
          {
            currentTab === tabs.save &&
            <Save
              download={downloadDraft}
              upload={uploadDraft}
              status={draftStatus}
            />
          }
          {
            currentTab === tabs.about &&
            <About />
          }
        </DialogContext.Provider>
      </div>

      <div id='mainControls' className={styles['main-controls']}>
        <FormButton
          toolTip='Clear all data'
          text='Clear'
          style='danger'
          onClick={() => {
            dispatchDialog({
              type: "openDanger",
              prompt: "Are you sure you want to *clear all data* in this draft? *This action is irreversible.*",
              actionText: "Clear all",
              onConfirm: clearAll
            })
          }}
        />
        <FormButton
          toolTip='Reset data to sample template'
          text='Reset'
          style='secondary'
          onClick={() => {
            dispatchDialog({
              type: "openDanger",
              prompt: "Are you sure you want to *reset all data* to default values? *This action is irreversible.*",
              actionText: "Reset all",
              onConfirm: resetAll,
            })
          }}
        />
        <FormButton
          toolTip='Export as PDF/print CV'
          text='Export'
          style='primary'
          onClick={print}
        />
      </div>
      <Preview
        data={data}
        layout={layout}
      />
      {
        dialogState.open &&
        <ConfirmDialog
          actionText={dialogState.actionText}
          danger={dialogState.danger}
          onConfirm={() => {
            dialogState.onConfirm();
            dispatchDialog({type: "close"});
          }}
          prompt={dialogState.prompt}
          onCancel={() => dispatchDialog({type: "close"})}
        />
      }
    </div>
  )
}

export default App

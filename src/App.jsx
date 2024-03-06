import { createContext, useEffect, useState } from 'react';
import { v4 as generateId } from 'uuid';

import logo from "./assets/images/logo.svg";
import appIcons from './data/appIconsBarrel';

import NavItem from './components/NavItem';
import FormButton from './components/FormButton';

import './styles/reset.css';
import './styles/App.css';
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
import Layout_01 from './layouts/Layout_01';
import Layout_02 from './layouts/Layout_02';

import { testDraftValidity } from './utils/draftValidation';
import DarkModeButton from './components/DarkModeButton';
import ConfirmDialog from './components/ConfirmDialog';

export const ScreenWidthContext = createContext(null);

function App() {

  const [darkMode, setDarkMode] = useState(Boolean(JSON.parse(localStorage.getItem("darkMode"))));
  const [currentTab, setCurrentTab] = useState(tabs.personalInfo);
  const [personalInfo, setPersonalInfo] = useState(getSessionData("personalInfo", sampleInfo.personalInfo));
  const [contact, setContact] = useState(getSessionData("contact", sampleInfo.contact));
  const [education, setEducation] = useState(getSessionData("education", sampleInfo.education));
  const [experience, setExperience] = useState(getSessionData("experience", sampleInfo.experience));
  const [links, setLinks] = useState(getSessionData("links", sampleInfo.links));
  const [skills, setSkills] = useState(getSessionData("skills", sampleInfo.skills));
  const [languages, setLanguages] = useState(getSessionData("languages", sampleInfo.languages));
  const [accentColor, setAccentColor] = useState(getSessionData("accentColor", sampleInfo.accentColor));
  const [font, setFont] = useState(getSessionData("font", sampleInfo.font));
  const [layout, setLayout] = useState(getSessionData("layout", sampleInfo.layout));
  const [draftStatus, setDraftStatus] = useState({code: 4, errorLog: []}); //code key is used to determine error panel text and color in Save component
  const [dialogState, setDialogState] = useState({open: false, actionText: "", prompt: "", onConfirm: () => {}});
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {

    window.addEventListener("resize", () => {
      
      setScreenWidth(window.innerWidth);
    });

    window.addEventListener("scroll", () => {
      
      setDialogState({...dialogState, open: false});
    });

    return () => {

      removeEventListener("resize", window);
      removeEventListener("scroll", window);
    }
  }, []);

  useEffect(() => {

    sessionStorage.setItem("data", JSON.stringify(data));

    return () => {};

  }, [education, personalInfo, contact, experience, links, skills, languages, accentColor, font, layout]);

  useEffect(() => {

    document.body.classList.remove(darkMode ? "light" : "dark");
    document.body.classList.add(darkMode ? "dark" : "light");

    return () => {};

  }, [darkMode]);

  const currentVersion = "1.3.3";
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
    const Jsondraft = await file.text();
    const draft = JSON.parse(Jsondraft);
    const errorLog = testDraftValidity(draft);

    if (errorLog.length > 0)
    {
      setDraftStatus({code: 2, errorLog: errorLog});
      return;
    }

    setDraftStatus({code: 0, errorLog: []});

    setAccentColor(draft.accentColor);
    setFont(draft.font);
    setSkills(draft.skills);
    setContact(draft.contact);
    setPersonalInfo(draft.personalInfo);
    setEducation(draft.education);
    setExperience(draft.experience);
    setLinks(draft.links);
    setLanguages(draft.languages);
    setLayout(draft.layout);
  }

  function downloadDraft()
  {
    const a = document.createElement("a");
    const downloadData = new Blob([JSON.stringify({version: currentVersion, ...data})]);
    a.href = window.URL.createObjectURL(downloadData, {type: "application/json"});
    a.download = "CV_draft.json";
    a.click();
  }

  function selectTab(id)
  {
    setCurrentTab(id)
  }

  function resetAll()
  {
    setPersonalInfo(sampleInfo.personalInfo);
    setContact(sampleInfo.contact);
    setEducation(sampleInfo.education);
    setExperience(sampleInfo.experience);
    setLanguages(sampleInfo.languages);
    setSkills(sampleInfo.skills);
    setLinks(sampleInfo.links);
    setLayout("layout-01");
    setAccentColor("#ffb400");
    setFont("regular");
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
    setEducation([]);
    setExperience([]);
    setLinks([]);
    setSkills([]);
    setLanguages([]);
  }

  function print()
  {
    window.print()
  }

  function closeDialog()
  {
    setDialogState({
      open: false,
      actionText: "",
      prompt: "",
      onConfirm: () => {},
    })
  }

  return (
    <>
      <img src={logo} alt="Easy CV builder's logo" className='logo' />

      <nav className='nav'>
        <DarkModeButton darkMode={darkMode} onClick={() => {
          setDarkMode(darkMode => !darkMode);
          localStorage.setItem("darkMode", JSON.stringify(!darkMode));
        }}/>
        <NavItem
          iconUrl={appIcons.personalInfo}
          title={currentTab}
          selected={currentTab === tabs.personalInfo}
          onClick={() => setCurrentTab(tabs.personalInfo)}
        />
        <NavItem
          iconUrl={appIcons.contact}
          title={currentTab}
          selected={currentTab === tabs.contact}
          onClick={() => setCurrentTab(tabs.contact)}
        />
        <NavItem
          iconUrl={appIcons.link}
          title={currentTab}
          selected={currentTab === tabs.links}
          onClick={() => setCurrentTab(tabs.links)}
        />
        <NavItem
          iconUrl={appIcons.education}
          title={currentTab}
          selected={currentTab === tabs.education}
          onClick={() => setCurrentTab(tabs.education)}
        />
        <NavItem
          iconUrl={appIcons.experience}
          title={currentTab}
          selected={currentTab === tabs.experience}
          onClick={() => setCurrentTab(tabs.experience)}
        />
        <NavItem
          iconUrl={appIcons.skills}
          title={currentTab}
          selected={currentTab === tabs.skills}
          onClick={() => setCurrentTab(tabs.skills)}
        />
        <NavItem
          iconUrl={appIcons.languages}
          title={currentTab}
          selected={currentTab === tabs.languages}
          onClick={() => setCurrentTab(tabs.languages)}
        />
        <NavItem
          iconUrl={appIcons.settings}
          title={currentTab}
          selected={currentTab === tabs.settings}
          onClick={() => setCurrentTab(tabs.settings)}
        />
        <NavItem
          iconUrl={appIcons.save}
          title={currentTab}
          selected={currentTab === tabs.save}
          onClick={() => setCurrentTab(tabs.save)}
        />
        <NavItem
          iconUrl={appIcons.about}
          title={currentTab}
          selected={currentTab === tabs.about}
          onClick={() => setCurrentTab(tabs.about)}
        />
      </nav>
      <div className="editor">
        <h1 className='editor-title'>{currentTab}</h1>
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
              setEducationItems = {setEducation}
              setDialogState={setDialogState}
              emptyText={emptyListText}
            />
          }
          {
            currentTab === tabs.experience &&
            <Experience
              experienceItems={experience}
              setExperienceItems={setExperience}
              setDialogState={setDialogState}
              emptyText={emptyListText}
            />
          }
          {
            currentTab === tabs.links &&
            <Links
              linksItems={links}
              setLinksItems={setLinks}
              setDialogState={setDialogState}
              emptyText={emptyListText}
            />
          }
          {
            currentTab === tabs.skills &&
            <Skills
              skillsItems={skills}
              setSkillsItems={setSkills}
              setDialogState={setDialogState}
              emptyText={emptyListText}
            />
          }
          {
            currentTab === tabs.languages &&
            <Languages
              languagesItems={languages}
              setLanguagesItems={setLanguages}
              setDialogState={setDialogState}
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
          <About
            version={currentVersion}
          />
        }
      </div>

      <div id='mainControls' className='main-controls'>
        <FormButton
          toolTip='Clear all data'
          text='Clear'
          classes={["form-button", "red-button", "push-left"]}
          onClick={() => {
            setDialogState({
              open: true,
              prompt: "Are you sure you want to clear ALL DATA in this draft? This action is irreversible.",
              actionText: "Clear all",
              onConfirm: () => {
                clearAll();
              }
            });
          }}
        />
        <FormButton
          toolTip='Reset data to sample template'
          text='Reset'
          classes={["form-button", "white-button"]}
          onClick={() => {
            setDialogState({
              open: true,
              actionText: "Reset all",
              prompt: "Are you sure you want to reset ALL DATA to default values? This action is irreversible.",
              onConfirm: () => {
                resetAll();
              }
            })
          }}
        />
        <FormButton toolTip='Export as PDF/print CV' text='Export' classes={["form-button", "blue-button"]} onClick={print}/>
      </div>
      {
        layout === "layout-01" &&
        <Layout_01
          data={data}
        />
      }
      {
        layout === "layout-02" &&
        <Layout_02
          data={data}
        />
      }
      {
        dialogState.open &&
        <ConfirmDialog
          actionText={dialogState.actionText}
          onConfirm={() => {
            dialogState.onConfirm();
            closeDialog();
          }}
          prompt={dialogState.prompt}
          onCancel={closeDialog}
        />
      }
    </>
  )
}

export default App

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
import sampleInfo from './utils/sampleInfo';
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

import { getItemIndex } from './utils/utility';
import { testDraftValidity } from './utils/draftValidation';
import DarkModeButton from './components/DarkModeButton';
import ConfirmDialog from './components/ConfirmDialog';

export const ScreenWidthContext = createContext(null);

function App() {

  //Using state to preserve id's, a regular variable regenerates all id's with every render
  const [tabs, setTabs] = useState([
    {
      title: "Personal Information",
      icon: appIcons.personalInfo,
      id: generateId(),
    },
    {
      title: "Education",
      icon: appIcons.education,
      id: generateId(),
    },
    {
      title: "Links",
      icon: appIcons.link,
      id: generateId(),
    },
    {
      title: "Contact",
      icon: appIcons.contact,
      id: generateId(),
    },
    {
      title: "Experience",
      icon: appIcons.experience,
      id: generateId(),
    },
    {
      title: "Skills",
      icon: appIcons.skills,
      id: generateId(),
    },
    {
      title: "Languages",
      icon: appIcons.languages,
      id: generateId(),
    },
    {
      title: "Settings",
      icon: appIcons.settings,
      id: generateId(),
    },
    {
      title: "Save / Load",
      icon: appIcons.save,
      id: generateId(),
    },
    {
      title: "About",
      icon: appIcons.about,
      id: generateId(),
    },
  ]);

  const [darkMode, setDarkMode] = useState(Boolean(JSON.parse(localStorage.getItem("darkMode"))));
  const [currentTab, setCurrentTab] = useState(tabs[0].id);
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

  const currentVersion = "1.3.2";
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

  function toggleHide(id, stateArray, stateSetter)
  {
    const newArray = Array.from(stateArray);
    const hideTarget = getItemIndex(newArray, id);
    newArray[hideTarget].hidden = !newArray[hideTarget].hidden;
    stateSetter(newArray);
  }

  function updateItems(newItem, stateArray, stateSetter)
  {
    const newArray = Array.from(stateArray);
    const newItemIndex = getItemIndex(newArray, newItem.id);

    if (newItemIndex === -1)
    {
      newArray.push(newItem)
    }
    else
    {
      newArray[newItemIndex] = newItem;
    }

    stateSetter(newArray);
  }

  function deleteItem(targetItemId, stateArray, stateSetter)
  {
    const newArray = stateArray.filter(item => item.id !== targetItemId);
    stateSetter(newArray);
  }

  function moveItemUp(targetItemId, stateArray, stateSetter)
  {
    const targetIndex = getItemIndex(stateArray, targetItemId);
    
    if (targetIndex === 0) return;
    const newArray = [];

    for (let i = 0; i < stateArray.length; i++)
    {
      if (i === targetIndex - 1)
      {
        newArray.push(stateArray[targetIndex]);
        newArray.push(stateArray[targetIndex-1]);
        i += 1; //skip both items - consider incremement at iteration end
        continue;
      }

      newArray.push(stateArray[i]);
    }

    stateSetter(newArray);
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
        {
          tabs.map(tab => (
            <NavItem 
              key={tab.id}
              id={tab.id}
              title={tab.title}
              iconUrl={tab.icon}
              selected={tab.id === currentTab}
              onClick={selectTab}
            />
          ))
        }
      </nav>
      <div className="editor">
        <h1 className='editor-title'>{tabs.find(tab => tab.id === currentTab).title}</h1>
        <PersonalInformation
          enabled={tabs[0].id === currentTab}
          personalInfo={personalInfo}
          setPersonalInfo={setPersonalInfo}
        />
        <Contact
          enabled={tabs[3].id === currentTab}
          contact={contact}
          setContact={setContact}
        />
        <ScreenWidthContext.Provider value={{screenWidth: screenWidth}}>
          <Education
            enabled={tabs[1].id === currentTab}
            educationItems={education}
            toggleHide={(id) => toggleHide(id, education, setEducation)}
            updateItems={(newItem) => updateItems(newItem, education, setEducation)}
            deleteItem={(targetItem) => deleteItem(targetItem, education, setEducation)}
            moveItemUp={(id) => moveItemUp(id, education, setEducation)}
            emptyText={emptyListText}
            setDialogState={setDialogState}
          />
          <Experience
            enabled={tabs[4].id === currentTab}
            experienceItems={experience}
            toggleHide={(id) => toggleHide(id, experience, setExperience)}
            updateItems={(newItem) => updateItems(newItem, experience, setExperience)}
            deleteItem={(targetItem) => deleteItem(targetItem, experience, setExperience)}
            moveItemUp={(id) => moveItemUp(id, experience, setExperience)}
            emptyText={emptyListText}
            setDialogState={setDialogState}
          />
          <Links
            enabled={tabs[2].id === currentTab}
            linksItems={links}
            toggleHide={(id) => toggleHide(id, links, setLinks)}
            updateItems={(newItem) => updateItems(newItem, links, setLinks)}
            deleteItem={(targetItem) => deleteItem(targetItem, links, setLinks)}
            moveItemUp={(id) => moveItemUp(id, links, setLinks)}
            emptyText={emptyListText}
            setDialogState={setDialogState}
          />
          <Skills
            enabled={tabs[5].id === currentTab}
            skillItems={skills}
            toggleHide={(id) => {toggleHide(id, skills, setSkills)}}
            updateItems={(newItem) => updateItems(newItem, skills, setSkills)}
            deleteItem={(targetItem) => deleteItem(targetItem, skills, setSkills)}
            moveItemUp={(id) => moveItemUp(id, skills, setSkills)}
            emptyText={emptyListText}
            setDialogState={setDialogState}
          />
          <Languages
            enabled={tabs[6].id === currentTab}
            languagetems={languages}
            toggleHide={(id) => {toggleHide(id, languages, setLanguages)}}
            updateItems={(newItem) => updateItems(newItem, languages, setLanguages)}
            deleteItem={(targetItem) => deleteItem(targetItem, languages, setLanguages)}
            moveItemUp={(id) => moveItemUp(id, languages, setLanguages)}
            emptyText={emptyListText}
            setDialogState={setDialogState}
          />
        </ScreenWidthContext.Provider>
        <Settings
          enabled={tabs[7].id === currentTab}
          color={accentColor}
          updateColor={(e) => setAccentColor(e.target.value)}
          font={font}
          updateFont={(e) => setFont(e.target.value)}
          layout={layout}
          updateLayout={(e) => setLayout(e.target.value)}
        />
        <Save
          enabled={tabs[8].id === currentTab}
          download={downloadDraft}
          upload={uploadDraft}
          status={draftStatus}
        />
        <About
          enabled={tabs[9].id === currentTab}
          version={currentVersion}
        />
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

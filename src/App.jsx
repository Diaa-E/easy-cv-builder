import { useState } from 'react';
import { v4 as generateId } from 'uuid';

import logo from "./assets/images/logo.svg";
import appIcons from './appIconsBarrel';

import NavItem from './components/NavItem';
import FormButton from './components/FormButton';

import './styles/reset.css';
import './styles/App.css';
import PersonalInformation from './components/PersonalInformation';
import Contact from './components/Contact';
import sampleInfo from './sampleInfo';
import Education from './components/Education';
import Experience from './components/Experience';
import linkIcons from './linkIconsBarrel';
import Links from './components/Links';
import Skills from './components/Skills';
import Languages from './components/Languages';
import Settings from './components/Settings';
import Save from './components/Save';
import About from './components/About';
import Layout_01 from './components/layouts/Layout_01';
import Layout_02 from './components/layouts/Layout_02';

import { testDraftValidity } from './utility';

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

  const [currentTab, setCurrentTab] = useState(tabs[0].id);
  const [personalInfo, setPersonalInfo] = useState(sampleInfo.personalInfo);
  const [contact, setContact] = useState(sampleInfo.contact);
  const [education, setEducation] = useState(sampleInfo.education);
  const [experience, setExperience] = useState(sampleInfo.experience);
  const [links, setLinks] = useState(sampleInfo.links);
  const [skills, setSkills] = useState(sampleInfo.skills);
  const [languages, setLanguages] = useState(sampleInfo.languages);
  const [accentColor, setAccentColor] = useState("#ffb400");
  const [font, setFont] = useState("regular");
  const [layout, setLayout] = useState("layout-01");
  const [draftStatus, setDraftStatus] = useState({code: 4, errorLog: []})

  const currentVersion = "1.0.5";
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

  const emptyEducationItem = {
    id: generateId(),
    degree: "Degree",
    school: "School",
    location: "",
    start: "",
    end: "",
    hidden: false
  };

  const emptyExperienceItem = {
    id: generateId(),
    company: "Unknown INC.",
    location: "city, Country",
    position: "Position title",
    start: "",
    end: "",
    details: "",
    hidden: false,
  };

  const emptyLinkItem = {
    id: generateId(),
    url: "website.com/john-doe",
    icon: linkIcons.find(item => item.name === "behance").icon,
    hidden: false,
  };

  const emptySkillsItem = {
    id: generateId(),
    name: "Skill",
    level: 60,
    hidden: false,
    showLevel: true,
  }

  const emptyLanguageItem = {
    id: generateId(),
    name: "Language",
    level: 60,
    hidden: false,
    showLevel: true,
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
    const hideTarget = newArray.findIndex(item => item.id === id);
    newArray[hideTarget].hidden = !newArray[hideTarget].hidden;
    stateSetter(newArray);
  }

  function updateItems(newItem, stateArray, stateSetter)
  {
    const newArray = Array.from(stateArray);
    const newItemIndex = newArray.findIndex(item => item.id === newItem.id);
    newArray[newItemIndex] = newItem;
    stateSetter(newArray);
  }

  function deleteItem(targetItemId, stateArray, stateSetter)
  {
    const newArray = stateArray.filter(item => item.id !== targetItemId);
    stateSetter(newArray);
  }

  return (
    <>
      <img src={logo} alt="Easy CV builder's logo" className='logo' />

      <nav className='nav'>
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

          fullName={personalInfo.fullName}
          profession={personalInfo.profession}
          address={personalInfo.address}
          zip={personalInfo.zip}

          updateFullName={(e) => setPersonalInfo({...personalInfo, fullName: e.target.value})}
          updateProfession={(e) => setPersonalInfo({...personalInfo, profession: e.target.value})}
          updateAddress={(e) => setPersonalInfo({...personalInfo, address: e.target.value})}
          updateZip={(e) => setPersonalInfo({...personalInfo, zip: e.target.value})}
        />
        <Contact
          enabled={tabs[3].id === currentTab}

          phoneNumber={contact.phoneNumber}
          email={contact.email}

          updatePhoneNumber={(e) => setContact({...contact, phoneNumber: e.target.value})}
          updateEmail={(e) => setContact({...contact, email: e.target.value})}
        />
        <Education
          enabled={tabs[1].id === currentTab}
          educationItems={education}
          addItem={() => setEducation([...education, emptyEducationItem])}
          toggleHide={(id) => toggleHide(id, education, setEducation)}
          updateItems={(newItem) => updateItems(newItem, education, setEducation)}
          deleteItem={(targetItem) => deleteItem(targetItem, education, setEducation)}
          emptyText={emptyListText}
        />
        <Experience
          enabled={tabs[4].id === currentTab}
          experienceItems={experience}
          addItem={() => setExperience([...experience, emptyExperienceItem])}
          toggleHide={(id) => toggleHide(id, experience, setExperience)}
          updateItems={(newItem) => updateItems(newItem, experience, setExperience)}
          deleteItem={(targetItem) => deleteItem(targetItem, experience, setExperience)}
          emptyText={emptyListText}
        />
        <Links
          enabled={tabs[2].id === currentTab}
          linksItems={links}
          addItem={() => setLinks([...links, emptyLinkItem])}
          toggleHide={(id) => toggleHide(id, links, setLinks)}
          updateItems={(newItem) => updateItems(newItem, links, setLinks)}
          deleteItem={(targetItem) => deleteItem(targetItem, links, setLinks)}
          emptyText={emptyListText}
        />
        <Skills
          enabled={tabs[5].id === currentTab}
          skillItems={skills}
          addItem={() => setSkills([...skills, emptySkillsItem])}
          toggleHide={(id) => {toggleHide(id, skills, setSkills)}}
          updateItems={(newItem) => updateItems(newItem, skills, setSkills)}
          deleteItem={(targetItem) => deleteItem(targetItem, skills, setSkills)}
          emptyText={emptyListText}
        />
        <Languages
          enabled={tabs[6].id === currentTab}
          languagetems={languages}
          addItem={() => setLanguages([...languages, emptyLanguageItem])}
          toggleHide={(id) => {toggleHide(id, languages, setLanguages)}}
          updateItems={(newItem) => updateItems(newItem, languages, setLanguages)}
          deleteItem={(targetItem) => deleteItem(targetItem, languages, setLanguages)}
          emptyText={emptyListText}
        />
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
        <FormButton text='Clear' classes={["form-button", "red-button"]} onClick={clearAll}/>
        <FormButton text='Reset' classes={["form-button", "white-button"]} onClick={resetAll}/>
        <FormButton text='Export' classes={["form-button", "blue-button"]} onClick={print}/>
      </div>

      <Layout_01
        enabled={layout === "layout-01"}
        data={data}
      />
      <Layout_02
        enabled={layout === "layout-02"}
        data={data}
      />
    </>
  )
}

export default App

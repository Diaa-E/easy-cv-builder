import { useState } from 'react';
import { v4 as generateId } from 'uuid';

import personalInfoIcon from "./assets/images/personal_info.svg";
import educationIcon from "./assets/images/education.svg";
import linkIcon from "./assets/images/links.svg";
import contactIcon from "./assets/images/contact.svg";
import experienceIcon from "./assets/images/experience.svg";
import skillsIcon from "./assets/images/skills.svg";
import languagesIcon from "./assets/images/languages.svg";
import settingsIcon from "./assets/images/settings.svg";
import logo from "./assets/images/logo.svg";

import NavItem from './components/NavItem';
import FormButton from './components/FormButton';

import './styles/reset.css';
import './styles/App.css';
import PersonalInformation from './components/PersonalInformation';
import Contact from './components/Contact';
import sampleInfo from './sampleInfo';
import Education from './components/Education';
import Experience from './components/Experience';
import linkIcons from './iconsBarrel';
import Links from './components/Links';
import Skills from './components/Skills';
import Languages from './components/Languages';

function App() {

  //Using state to preserve id's, a regular variable regenerates all id's with every render
  const [tabs, setTabs] = useState([
    {
      title: "Personal Information",
      icon: personalInfoIcon,
      id: generateId(),
    },
    {
      title: "Education",
      icon: educationIcon,
      id: generateId(),
    },
    {
      title: "Links",
      icon: linkIcon,
      id: generateId(),
    },
    {
      title: "Contact",
      icon: contactIcon,
      id: generateId(),
    },
    {
      title: "Experience",
      icon: experienceIcon,
      id: generateId(),
    },
    {
      title: "Skills",
      icon: skillsIcon,
      id: generateId(),
    },
    {
      title: "Languages",
      icon: languagesIcon,
      id: generateId(),
    },
    {
      title: "Settings",
      icon: settingsIcon,
      id: generateId(),
    }
  ]);

  const [currentTab, setCurrentTab] = useState(tabs[0].id);
  const [personalInfo, setPersonalInfo] = useState(sampleInfo.personalInfo);
  const [contact, setContact] = useState(sampleInfo.contact);
  const [education, setEducation] = useState(sampleInfo.education);
  const [experience, setExperience] = useState(sampleInfo.experience);
  const [links, setLinks] = useState(sampleInfo.links);
  const [skills, setSkills] = useState(sampleInfo.skills);
  const [languages, setLanguages] = useState(sampleInfo.languages);

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

  function selectTab(id)
  {
    setCurrentTab(id)
  }

  function resetAll()
  {
    setPersonalInfo(sampleInfo.personalInfo);
    setContact(sampleInfo.contact);
    setEducation(sampleInfo.education);
  }

  function clearAll()
  {

  }

  function print()
  {

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

  function deleteItem(targetItem, stateArray, stateSetter)
  {
    const newArray = stateArray.filter(item => item.id !== targetItem.id);
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

      <div id='mainControls' className='main-controls'>
        <FormButton text='Clear' classes={["form-button", "red-button"]} onClick={clearAll}/>
        <FormButton text='Reset' classes={["form-button", "white-button"]} onClick={resetAll}/>
        <FormButton text='Print' classes={["form-button", "blue-button"]} onClick={print}/>
      </div>

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
        />
        <Experience
          enabled={tabs[4].id === currentTab}
          experienceItems={experience}
          addItem={() => setExperience([...experience, emptyExperienceItem])}
          toggleHide={(id) => toggleHide(id, experience, setExperience)}
          updateItems={(newItem) => updateItems(newItem, experience, setExperience)}
          deleteItem={(targetItem) => deleteItem(targetItem, experience, setExperience)}
        />
        <Links
          enabled={tabs[2].id === currentTab}
          linksItems={links}
          addItem={() => setLinks([...links, emptyLinkItem])}
          toggleHide={(id) => toggleHide(id, links, setLinks)}
          updateItems={(newItem) => updateItems(newItem, links, setLinks)}
          deleteItem={(targetItem) => deleteItem(targetItem, links, setLinks)}
        />
        <Skills
          enabled={tabs[5].id === currentTab}
          skillItems={skills}
          addItem={() => setSkills([...skills, emptySkillsItem])}
          toggleHide={(id) => {toggleHide(id, skills, setSkills)}}
          updateItems={(newItem) => updateItems(newItem, skills, setSkills)}
          deleteItem={(targetItem) => deleteItem(targetItem, skills, setSkills)}
        />
        <Languages
          enabled={tabs[6].id === currentTab}
          languagetems={languages}
          addItem={() => setLanguages([...languages, emptyLanguageItem])}
          toggleHide={(id) => {toggleHide(id, languages, setLanguages)}}
          updateItems={(newItem) => updateItems(newItem, languages, setLanguages)}
          deleteItem={(targetItem) => deleteItem(targetItem, languages, setLanguages)}
        />
      </div>
    </>
  )
}

export default App

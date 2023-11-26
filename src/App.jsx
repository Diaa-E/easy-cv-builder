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

  const emptyEducationItem = {
    id: generateId(),
    degree: "Degree",
    school: "School",
    location: "",
    start: "",
    end: "",
    hidden: false
  }

  function selectTab(id)
  {
    setCurrentTab(id)
  }

  function resetAll()
  {
    setPersonalInfo(sampleInfo.personalInfo);
    setContact(sampleInfo.contact);
  }

  function clearAll()
  {

  }

  function print()
  {

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
          toggleHide={(id) => {
            const newEducation = Array.from(education);
            const hideTarget = newEducation.findIndex(item => item.id === id);
            newEducation[hideTarget].hidden = !newEducation[hideTarget].hidden;
            setEducation(newEducation);
          }}
          updateItems={(newItem) => {
            const newEducation = Array.from(education);
            const newItemIndex = newEducation.findIndex(item => item.id === newItem.id);
            newEducation[newItemIndex] = newItem;
            setEducation(newEducation);
          }}
        />
      </div>
    </>
  )
}

export default App

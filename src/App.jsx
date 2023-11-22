import { useState } from 'react';
import { v4 as generateId } from 'uuid';

import personalInfoIcon from "./assets/personal_info.svg";
import educationIcon from "./assets/education.svg";
import linkIcon from "./assets/links.svg";
import contactIcon from "./assets/contact.svg";
import experienceIcon from "./assets/experience.svg";
import skillsIcon from "./assets/skills.svg";
import languagesIcon from "./assets/languages.svg";
import settingsIcon from "./assets/settings.svg";
import logo from "./assets/logo.svg";

import NavItem from './components/NavItem';

import './styles/reset.css';
import './styles/App.css';


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

  function selectTab(id)
  {
    setCurrentTab(id)
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
    </>
  )
}

export default App

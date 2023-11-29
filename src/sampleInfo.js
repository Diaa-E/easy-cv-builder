import { v4 as generateId } from 'uuid';
import linkIcons from "./linkIconsBarrel";

const sampleInfo = {
    personalInfo: {
        fullName: "John Doe",
        profession: "Graphic Designer",
        address: "x unknown st., city.",
        zip: "xxxxx"
    },
    contact: {
        phoneNumber: "+xx xxxxxxxx",
        email: "john_doe@email.com",
    },
    education: [
        {
            id: generateId(),
            degree: "B.S in computer science",
            school: "Unknown university",
            location: "Unknown city",
            start: "2000",
            end: "2004",
            hidden: false
        },
        {
            id: generateId(),
            degree: "Master's in computer science",
            school: "Unknown university",
            location: "Unknown city",
            start: "2005",
            end: "2010", 
            hidden: true
        },
    ],
    experience: [
        {
            id: generateId(),
            company: "Unknown INC.",
            location: "city, Country",
            position: "Position title",
            start: "2012",
            end: "2013",
            details: "",
            hidden: true
        },
        {
            id: generateId(),
            company: "Known INC.",
            location: "city, Country",
            position: "Position title",
            start: "2013",
            end: "present",
            details: "",
            hidden: false,
        }
    ],
    links: [
        {
            id: generateId(),
            url: "github.com/john-doe",
            icon: linkIcons.find(item => item.name === "github").icon,
            hidden: false,
        },
        {
            id: generateId(),
            url: "behance.com/john-doe",
            icon: linkIcons.find(item => item.name === "behance").icon,
            hidden: true,
        }
    ],
    skills: [
        {
            id: generateId(),
            name: "HTML",
            level: 20,
            hidden: false,
            showLevel: true,
        },
        {
            id: generateId(),
            name: "CSS",
            level: 60,
            hidden: true,
            showLevel: true,
        },
        {
            id: generateId(),
            name: "JavaScript",
            level: 100,
            hidden: false,
            showLevel: false,
        }
    ],
    languages: [
        {
            id: generateId(),
            name: "English",
            level: 20,
            hidden: false,
            showLevel: true,
        },
        {
            id: generateId(),
            name: "Russian",
            level: 60,
            hidden: true,
            showLevel: true,
        },
        {
            id: generateId(),
            name: "Arabic",
            level: 100,
            hidden: false,
            showLevel: false,
        }
    ],
}

export default sampleInfo
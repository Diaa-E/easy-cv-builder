import { v4 as generateId } from 'uuid';
import linkIcons from "./iconsBarrel";

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
            link: "github.com/john-doe",
            icon: linkIcons.gitHub,
            hidden: false,
        },
        {
            id: generateId(),
            link: "behance.com/john-doe",
            icon: linkIcons.behance,
            hidden: true,
        }
    ],
}

export default sampleInfo
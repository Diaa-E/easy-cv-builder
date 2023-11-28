import githubIcon from "./assets/link_icons/github.svg";
import behanceIcon from "./assets/link_icons/behance.svg";
import { v4 as generateId } from 'uuid';

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
            icon: githubIcon,
            hidden: false,
        },
        {
            id: generateId(),
            link: "behance.com/john-doe",
            icon: behanceIcon,
            hidden: true,
        }
    ],
}

export default sampleInfo
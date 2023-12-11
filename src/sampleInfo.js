import { v4 as generateId } from 'uuid';
import linkIcons from "./linkIconsBarrel";

const sampleInfo = {
    personalInfo: {
        fullName: "Bruce T. Wayne",
        profession: "CEO",
        address: "Wayne manor, Gotham city, U.S.A.",
        zip: "xxxxx"
    },
    contact: {
        phoneNumber: "+1 xxxxxxxx",
        email: "bruce_wayne@mail.waynetech.com",
    },
    education: [
        {
            id: generateId(),
            degree: "B.S in computer science",
            school: "Gotham University",
            location: "Gotham city",
            start: "xxxx",
            end: "xxxx",
            hidden: false
        },
        {
            id: generateId(),
            degree: "Master's in computer science",
            school: "Gotham University",
            location: "Gotham City",
            start: "xxxx",
            end: "xxxx", 
            hidden: false,
        },
        {
            id: generateId(),
            degree: "B.S in engineering",
            school: "Gotham University",
            location: "Gotham City",
            start: "xxxx",
            end: "xxxx", 
            hidden: false,
        },
    ],
    experience: [
        {
            id: generateId(),
            company: "Wayne Tech",
            location: "Gotham city, U.S.A.",
            position: "C.E.O",
            start: "xxxx",
            end: "xxxx",
            details: "Managing and growing the family business.",
            hidden: false
        },
    ],
    links: [
        {
            id: generateId(),
            url: "waynetech.com",
            icon: "other",
            hidden: false,
        },
    ],
    skills: [
        {
            id: generateId(),
            name: "Swordsmanship",
            level: 100,
            hidden: false,
            showLevel: true,
        },
        {
            id: generateId(),
            name: "Ninjutsu",
            level: 100,
            hidden: true,
            showLevel: true,
        },
        {
            id: generateId(),
            name: "Manhunting",
            level: "80",
            hidden: false,
            showLevel: true,
        },
        {
            id: generateId(),
            name: "Stage Magic",
            level: 40,
            hidden: false,
            showLevel: true,
        },
    ],
    languages: [
        {
            id: generateId(),
            name: "English (Native)",
            level: 100,
            hidden: false,
            showLevel: true,
        },
        {
            id: generateId(),
            name: "Russian",
            level: 60,
            hidden: false,
            showLevel: true,
        },
        {
            id: generateId(),
            name: "Chineese",
            level: 40,
            hidden: false,
            showLevel: true,
        }
    ],
}

export default sampleInfo
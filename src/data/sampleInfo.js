import { v4 as generateId } from 'uuid';

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
            icon: "website",
            hidden: false,
        },
    ],
    skills: [
        {
            id: generateId(),
            name: "Swords-manship",
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
            level: 80,
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
            name: "English",
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
    accentColor: "#ffb400",
    font: "regular",
    layout: "layout-01",
    order: "educationFirst",
    levelMode: "bar"
}

export default sampleInfo
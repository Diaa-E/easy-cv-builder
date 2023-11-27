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
            id: 0,
            degree: "B.S in computer science",
            school: "Unknown university",
            location: "Unknown city",
            start: "2000",
            end: "2004",
            hidden: false
        },
        {
            id: 1,
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
            id: 2,
            company: "Unknown INC.",
            location: "city, Country",
            position: "Position title",
            start: "2012",
            end: "2013",
            details: "",
            hidden: true
        },
        {
            id: 3,
            company: "Known INC.",
            location: "city, Country",
            position: "Position title",
            start: "2013",
            end: "present",
            details: "",
            hidden: false,
        }
    ],
}

export default sampleInfo
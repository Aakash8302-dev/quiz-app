const allBranches = [
    {
        id: 1,
        value: "All"
    },
    {
        id: 2,
        value: "Automobile Engineering"
    },
    {
        id: 3,
        value: "Biotechnology"
    },
    {
        id: 4,
        value: "Chemical Engineering"
    },
    {
        id: 5,
        value: "Civil Engineering"
    },
    {
        id: 6,
        value: "Computer Science and Engineering"
    },
    {
        id: 7,
        value: "Electrical and Electronics Engineering"
    },
    {
        id: 8,
        value: "Electronics and Communication Engineering"
    },
    {
        id: 9,
        value: "Information Technology"
    },
    {
        id: 10,
        value: "Mechanical Engineering"
    },
    {
        id: 11,
        value: "AI & DS"
    }
]


const branches = [
    {
        id: 1,
        value: "Automobile Engineering"
    },
    {
        id: 2,
        value: "Biotechnology"
    },
    {
        id: 3,
        value: "Chemical Engineering"
    },
    {
        id: 4,
        value: "Civil Engineering"
    },
    {
        id: 5,
        value: "Computer Science and Engineering"
    },
    {
        id: 6,
        value: "Electrical and Electronics Engineering"
    },
    {
        id: 7,
        value: "Electronics and Communication Engineering"
    },
    {
        id: 8,
        value: "Information Technology"
    },
    {
        id: 9,
        value: "Mechanical Engineering"
    },
    {
        id: 10,
        value: "AI & DS"
    }
]


const specificCategory = [
    {
        id: 1,
        value: 'Core',
        disabled: false,
    },
    {
        id: 2,
        value: 'Coding',
        disabled: true,
    },
    {
        id: 3,
        value: 'Aptitude',
        disabled: true,
    },
    {
        id: 4,
        value: 'Verbal',
        disabled: true,
    },
];

const commonCategory = [
    {
        id: 1,
        value: 'Core',
        disabled: true,
    },
    {
        id: 2,
        value: 'Coding',
        disabled: false,
    },
    {
        id: 3,
        value: 'Aptitude',
        disabled: false,
    },
    {
        id: 4,
        value: 'Verbal',
        disabled: false,
    },
];


const qSetValue = [
    {
        id: 1,
        value: '1',
        disable: false
    },
    {
        id: 2,
        value: '2',
        disable: false
    },
    {
        id: 3,
        value: '3',
        disable: false
    }
]


const headers = [
    {label: "First Name", key: "firstName"},
    {label: "Last Name", key: "lastName"},
    {label: "Department", key: "dept"},
    {label: "Register Number", key: "regNo"},
    {label: "Aptitude", key: "aptitudeScore"},
    {label: "Verbal", key: "verbalScore"},
    {label: "Coding", key: "codingScore"},
    {label: "Core", key: "coreScore"},
    {label: "Total", key: "totalScore"},
]


export { allBranches, branches, commonCategory, specificCategory, qSetValue, headers }
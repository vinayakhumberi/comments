
export const USERS = {
    VIN957: {
        id: "VIN957",
        name: "Vincent",
        comments: []
    },
    JA1035: {
        id: "JA1035",
        name: "Jack",
        comments: [],
    },
    RIS049: {
        id: "RIS049",
        name: "Rishi",
        comments: []
    }
};

export const COMMENTS = {
    a1245: {
        id: "a1245",
        user: "VIN957",
        text: "This is text message - 1",
        isActive: true,
        replies: [
            "a3249",
            "a3019"
        ],
        parentId: null,
        timestamp: "1671389194939",
    },
    a3246: {
        id: "a3246",
        user: "VIN957",
        text: "This is text message - 2",
        isActive: true,
        replies: [],
        parentId: null,
        timestamp: "1671389164939",
    },
    a3249: {
        id: "a3249",
        user: "VIN957",
        text: "This is text message - 1-2",
        isActive: true,
        replies: [
            "a3219"
        ],
        parentId: "a1245",
        timestamp: "1671389144939",
    },
    a3219: {
        id: "a3219",
        user: "RIS049",
        text: "This is text message - 1-3",
        isActive: true,
        replies: [],
        parentId: "a3249",
        timestamp: "1671389144939",
    },
    a3019: {
        id: "a3019",
        user: "JA1035",
        text: "This is text message - 1-4",
        isActive: true,
        replies: [],
        parentId: "a1245",
        timestamp: "1671389144939",
    },

}

export default {
    USERS,
    COMMENTS
}
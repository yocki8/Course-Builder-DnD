const items = [
    {
        id: "id1",
        name: `sample items can't be downloaded (add yours)`,
        type: "module",
        canHaveChildren: (dragItem) => dragItem.type != "module"
    },
    {
        id: "id2",
        name: "sample module 2",
        type: "module",
        children: [
            {
                id: "id7",
                name: "sample pdf 2",
                type: "pdf",
                canHaveChildren: false,
            },
            {
                id: "id8",
                name: "sample link 2",
                type: "link",
                canHaveChildren: false,
            },
            {
                id: "id9",
                name: "sample img 2",
                type: "img",
                canHaveChildren: false,
            },
        ],
        canHaveChildren: (dragItem) => dragItem.type != "module",
    },
    {
        id: "id3",
        name: "sample module 3",
        type: "module",
        canHaveChildren: (dragItem) => dragItem.type != "module",
    },

    {
        id: "id4",
        name: "sample pdf 1",
        type: "pdf",
        canHaveChildren: false,
    },
    {
        id: "id5",
        name: "sample link 1",
        type: "link",
        canHaveChildren: false,
    },
    {
        id: "id6",
        name: "sample img 1",
        type: "img",
        canHaveChildren: false,
    },
];


export {items};
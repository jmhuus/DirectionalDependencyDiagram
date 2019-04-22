var treeData = [
    {
        "name": "ServerTable1",
        "id": 1,
        "parents": []
    },
    {
        "name": "ServerTable2",
        "id": 2,
        "parents": []
    },
    {
        "name": "ServerTable3",
        "id": 3,
        "parents": []
    },
    {
        "name": "##Tmp_GatherContacts",
        "id": 4,
        "parents": [1,2,3]
    },
    {
        "name": "##Tmp_Consolidate",
        "id": 5,
        "parents": [4]
    },
    {
        "name": "##Tmp_GatherLeadInfo",
        "id": 6,
        "parents": [5,7,8,9]
    },
    {
        "name": "ServerTable7",
        "id": 7,
        "parents": []
    },
    {
        "name": "ServerTable8",
        "id": 8,
        "parents": []
    },
    {
        "name": "ServerTable9",
        "id": 9,
        "parents": []
    },
    {
        "name": "##Tmp_Format",
        "id": 10,
        "parents": [6,5]
    },
    {
        "name": "SELECT_RESULT",
        "id": 11,
        "parents": [1,5]
    }
];

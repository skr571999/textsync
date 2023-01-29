const { generateRandomText } = require('./utils');

const defaultRoomValue = { value: '', lastUpdate: '', usersCount: 0 };

const store = {
    default: { ...defaultRoomValue },
};

// - Store Structure
// room_id: {
//   value: "",
//   lastUpdate: "",
//   usersCount: 0,
// },

const addNewRoom = (roomId = generateRandomText(6)) => {
    if (!store[roomId]) {
        store[roomId] = { ...defaultRoomValue };
    }

    return roomId;
};

const updateRoomData = (roomId, data) => {
    const lastUpdate = data.lastUpdate;
    const value = data.value;
    if (!isRoomExists(roomId)) return false;

    if (store[roomId].lastUpdate < lastUpdate) {
        store[roomId].value = value;
        store[roomId].lastUpdate = lastUpdate;
    }

    return true;
};

const addUserToRoom = (roomId) => {
    ++store[roomId].usersCount;
    return true;
};

const removeUserFromRoom = (roomId) => {
    if (store[roomId]) {
        --store[roomId].usersCount;
        return true;
    } else {
        return false;
    }
};

const getRoomData = (roomId) => store[roomId];

const getRoomUsersCount = (roomId) => store[roomId].usersCount;

const isRoomExists = (roomId) => !!store[roomId];

module.exports = {
    addNewRoom,
    updateRoomData,
    getRoomData,
    isRoomExists,
    addUserToRoom,
    removeUserFromRoom,
    getRoomUsers: getRoomUsersCount,
    updateRoomData,
};

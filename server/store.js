const { generateRandomText } = require("./utils");

const store = {};

// - Store Structure
// room_id: {
//   value: "",
//   lastUpdate: "",
//   users: 0,
// },

const addNewRoom = () => {
  const roomId = generateRandomText(6);

  if (!store[roomId]) {
    store[roomId] = {
      value: "",
      lastUpdate: "",
      users: 1,
    };
  }

  return roomId;
};

const updateRoomData = (data) => {
  const lastUpdate = data.lastUpdate;
  const value = data.value;
  const roomId = data.room;
  if (!isRoomExists(roomId)) return false;

  if (store[roomId].lastUpdate < lastUpdate) {
    store[roomId].value = value;
    store[roomId].lastUpdate = lastUpdate;
    return roomId;
  }

  return true;
};

const addUserToRoom = (roomId) => {
  ++store[roomId].users;

  return true;
};

const removeUserFromRoom = (roomId) => {
  if (store[roomId]) {
    --store[roomId].users;
    return true;
  } else {
    return false;
  }
};

const getRoomData = (roomId) => {
  return store[roomId];
};

const getRoomUsers = (roomId) => {
  return store[roomId].users;
};

const isRoomExists = (roomId) => {
  return !!store[roomId];
};

module.exports = {
  addNewRoom,
  updateRoomData,
  getRoomData,
  isRoomExists,
  addUserToRoom,
  removeUserFromRoom,
  getRoomUsers,
  updateRoomData,
  store,
};

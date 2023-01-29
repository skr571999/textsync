const http = require('http');
const socketIO = require('socket.io');

const { addNewRoom, getRoomData, isRoomExists, addUserToRoom, getRoomUsers, removeUserFromRoom, updateRoomData } = require('./server/store');

const PORT = process.env.PORT || 8000;

const server = http.createServer((req, res) => res.end('Ok'));
const io = socketIO(server, { cors: { origin: '*' } });

io.on('connection', (socket) => {
    console.log('Client connected');

    // NOTE: By default socket will join 'default' room
    socket.roomId = 'default';
    socket.join(socket.roomId);
    addUserToRoom(socket.roomId);
    // Check here if we can use socket Id to send back
    io.to(socket.roomId).emit('response', { status: true, data: { roomId: socket.roomId, ...getRoomData(socket.roomId) } });

    socket.on('updateText', (data) => {
        updateRoomData(socket.roomId, data);

        socket.broadcast.to(socket.roomId).emit('response', { status: true, data: { roomId: socket.roomId, ...getRoomData(socket.roomId) } });
    });

    socket.on('join', (_roomId) => {
        console.log('Join ', _roomId);

        if (!isRoomExists(_roomId)) {
            console.log('Room not exists ', _roomId);
            addNewRoom(_roomId);
        }

        socket.leave(socket._roomId);
        socket.join(_roomId);
        socket.roomId = _roomId;

        addUserToRoom(_roomId);

        io.to(_roomId).emit('response', { status: true, data: { roomId: socket.roomId, ...getRoomData(socket.roomId) } });
    });

    socket.on('roomData', () => {
        socket.emit('response', { status: true, data: { roomId: socket.roomId, ...getRoomData(socket.roomId) } });
    });

    socket.on('disconnect', () => {
        const _roomId = socket.roomId;
        if (isRoomExists(_roomId)) {
            removeUserFromRoom(_roomId);
            io.to(_roomId).emit('response', { status: true, data: { roomId: socket.roomId, ...getRoomData(socket.roomId) } });
        }
        console.log('Client disconnected from room', _roomId);
    });
});

server.listen(PORT, () => console.log(`Listening on ${PORT}`));

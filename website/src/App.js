import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

import './App.css';
import { config, defaultDataValue, defaultSettings, themeColor } from './constants';

import NavBar from './components/NavBar';
import TextArea from './components/TextArea';
import ConnectingModal from './components/ConnectingModal';
import NewRoomJoinModal from './components/NewRoomJoinModal';
import SettingsModal from './components/SettingsModal';
import RoomInfoModal from './components/RoomInfoModal';

const App = () => {
    const [data, setData] = useState(defaultDataValue);
    const [roomId, setRoomId] = useState('');
    const [usersCount, setUsersCount] = useState(0);
    const [socket, setSocket] = useState();
    const [settings, setSettings] = useState(defaultSettings);
    const [currentModal, setCurrentModal] = useState('Connecting');

    const setSettingsFromLocalStorage = () => {
        const _settings = JSON.parse(localStorage.getItem('settings') || JSON.stringify(defaultSettings));

        setSettings(_settings);
    };

    const handleChange = (event) => {
        const { value } = event.target;

        setData((prev) => {
            const _prev = { ...prev };
            _prev.value = value;
            _prev.lastUpdate = new Date().getTime();
            if (socket) socket.emit('updateText', { ..._prev, room: roomId });
            return _prev;
        });
    };

    const cutAllText = () => {
        copyAllText();
        setData((prev) => {
            const _prev = { ...prev };
            _prev.value = '';
            _prev.lastUpdate = new Date().getTime();
            if (socket) socket.emit('updateText', _prev);
            return _prev;
        });
    };

    const copyAllText = () => {
        navigator.clipboard.writeText(data.value);
    };

    const handleRoomJoin = (roomId) => {
        console.log('New Room ', roomId);
        if (roomId) {
            if (socket) socket.emit('join', roomId);
            closeModal();
        }
    };

    const openSessionInfo = () => setCurrentModal('SessionInfo');

    const openSettings = () => setCurrentModal('Settings');

    const openNewSessionJoin = () => setCurrentModal('NewSessionJoin');

    const closeModal = () => setCurrentModal('');

    useEffect(() => {
        setSettingsFromLocalStorage();

        const _socket = io(config.BASE_URL);
        setSocket(_socket);
        _socket.emit('roomData', '');

        _socket.on('response', (response) => {
            console.log('R ', response);
            if (response.status && response.data) {
                const responseData = response.data;
                if (responseData.roomId) {
                    setRoomId(responseData.roomId);
                }
                if (typeof responseData.usersCount === 'number') {
                    setUsersCount(responseData.usersCount);
                }
                if (data.lastUpdate !== responseData.lastUpdate) {
                    setData((prev) => {
                        const _prev = { ...prev };
                        _prev.value = responseData.value || '';
                        _prev.lastUpdate = responseData.lastUpdate || 0;
                        _prev.usersCount = responseData.usersCount || 0;

                        return _prev;
                    });
                }
            }
        });

        _socket.on('connect', () => setCurrentModal(''));
        _socket.on('disconnect', () => setCurrentModal('Connecting'));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="mainContainer">
            <NavBar
                usersCount={usersCount}
                openSessionInfo={openSessionInfo}
                openSettings={openSettings}
                copyAllText={copyAllText}
                cutAllText={cutAllText}
            />
            {currentModal === 'Connecting' && <ConnectingModal />}
            {currentModal === '' && (
                <TextArea value={data.value} handleChange={handleChange} fontSize={settings.fontSize} themeColor={themeColor[settings.theme]} />
            )}
            {currentModal === 'SessionInfo' && <RoomInfoModal openNewRoomJoin={openNewSessionJoin} roomId={roomId} closeModal={closeModal} />}
            {currentModal === 'NewSessionJoin' && (
                <NewRoomJoinModal openSessionInfo={openSessionInfo} handleRoomJoin={handleRoomJoin} closeModal={closeModal} />
            )}
            {currentModal === 'Settings' && <SettingsModal closeModal={closeModal} settings={settings} setSettings={setSettings} />}
        </div>
    );
};

export default App;

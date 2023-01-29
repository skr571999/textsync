import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

import "./App.css";
import NavBar from "./components/NavBar";
import TextArea from "./components/TextArea";
import {
  DataValueType,
  SettingsType,
  SuccessDataResponseType,
} from "./services/model";
import {
  config,
  defaultDataValue,
  defaultSettings,
  themeColor,
} from "./constants";

import ConnectingModal from "./components/ConnectingModal";
import NewRoomJoinModal from "./components/NewRoomJoinModal";
import SettingsModal from "./components/SettingsModal";
import RoomInfoModal from "./components/RoomInfoModal";

type CurrentModalType =
  | ""
  | "SessionInfo"
  | "NewSessionJoin"
  | "Settings"
  | "Connecting";

const App = () => {
  const [data, setData] = useState<DataValueType>(defaultDataValue);
  const [room, setRoom] = useState("");
  const [user, setUser] = useState(0);
  const [socket, setSocket] = useState<Socket>();
  const [settings, setSettings] = useState<SettingsType>(defaultSettings);

  const [currentModal, setCurrentModal] =
    useState<CurrentModalType>("Connecting");

  const setSettingsFromLocalStorage = () => {
    const _settings: SettingsType = JSON.parse(
      localStorage.getItem("settings") || JSON.stringify(defaultSettings)
    );

    setSettings(_settings);
  };

  useEffect(() => {
    setSettingsFromLocalStorage();

    const _socket = io(config.BASE_URL);
    setSocket(_socket);
    _socket.emit("getText", { room: room });
    _socket.emit("room", "");

    _socket.on("response", (response: SuccessDataResponseType) => {
      console.log("R ", response);

      if (response.status === "success") {
        // to update user
        if (typeof response.users === "number") {
          setUser(response.users);
        }
        // to update room
        if (response.room_id) {
          setRoom(response.room_id);
        }
        // To update text
        if (response.data && data.lastUpdate !== response.data.lastUpdate) {
          setData((prev) => {
            const _prev = { ...prev };
            _prev.value = response.data?.value || "";
            _prev.lastUpdate = response.data?.lastUpdate || 0;
            _prev.users = response.data?.users || 0;

            return _prev;
          });

          setUser(response.data.users);
        }
      }
    });

    _socket.on("connect", () => {
      setCurrentModal("");
    });

    _socket.on("disconnect", () => {
      setCurrentModal("Connecting");
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;

    setData((prev) => {
      const _prev = { ...prev };
      _prev.value = value;
      _prev.lastUpdate = new Date().getTime();
      if (socket) socket.emit("updateText", { ..._prev, room });
      return _prev;
    });
  };

  const cutAllText = () => {
    copyAllText();
    setData((prev) => {
      const _prev = { ...prev };
      _prev.value = "";
      _prev.lastUpdate = new Date().getTime();
      if (socket) socket.emit("updateText", _prev);
      return _prev;
    });
  };

  const copyAllText = () => {
    navigator.clipboard.writeText(data.value);
  };

  const handleRoomJoin = (roomId: string) => {
    console.log("Room ", roomId);

    if (roomId === "") {
      if (socket) socket.emit("room", "");
    } else {
      if (socket) socket.emit("join", roomId);
      socket?.emit("room", "");
      closeModal();
    }
  };

  const openSessionInfo = () => {
    setCurrentModal("SessionInfo");
  };

  const openSettings = () => {
    setCurrentModal("Settings");
  };

  const openNewSessionJoin = () => {
    setCurrentModal("NewSessionJoin");
  };

  const closeModal = () => {
    setCurrentModal("");
  };

  return (
    <div className="mainContainer">
      <NavBar
        userCount={user}
        openSessionInfo={openSessionInfo}
        openSettings={openSettings}
        copyAllText={copyAllText}
        cutAllText={cutAllText}
      />
      {currentModal === "Connecting" && <ConnectingModal />}
      {currentModal === "" && (
        <>
          <TextArea
            value={data.value}
            handleChange={handleChange}
            fontSize={settings.fontSize}
            themeColor={themeColor[settings.theme]}
          />
        </>
      )}
      {currentModal === "SessionInfo" && (
        <RoomInfoModal
          openNewRoomJoin={openNewSessionJoin}
          roomId={room}
          closeModal={closeModal}
        />
      )}
      {currentModal === "NewSessionJoin" && (
        <NewRoomJoinModal
          openSessionInfo={openSessionInfo}
          handleRoomJoin={handleRoomJoin}
          closeModal={closeModal}
        />
      )}
      {currentModal === "Settings" && (
        <SettingsModal
          closeModal={closeModal}
          settings={settings}
          setSettings={setSettings}
        />
      )}
    </div>
  );
};

export default App;

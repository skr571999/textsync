import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

import "./App.css";
import NavBar from "./components/NavBar";
import TextArea from "./components/TextArea";
import {
  DataValueType,
  SuccessDataResponseType,
  ThemeType,
} from "./services/model";
import { config, defaultDataValue, themeColor } from "./constants";
import ConnectingBanner from "./components/ConnectingBanner";

const App = () => {
  const [data, setData] = useState<DataValueType>(defaultDataValue);
  const [isServerConnected, setIsServerConnected] = useState(false);
  const [room, setRoom] = useState("");
  const [user, setUser] = useState(0);
  const [theme, setTheme] = useState<ThemeType>(themeColor.light);
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const _theme = localStorage.getItem("theme");
    if (_theme === "dark") setTheme(themeColor.dark);

    const _socket = io(config.BASE_URL);
    setSocket(_socket);
    _socket.emit("getText", { room: room });

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
      setIsServerConnected(true);
    });

    _socket.on("disconnect", () => {
      setIsServerConnected(false);
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

  const handleToggleTheme = () => {
    setTheme({ backgroundColor: theme.color, color: theme.backgroundColor });
    const _theme = localStorage.getItem("theme");
    if (_theme === "dark") {
      localStorage.setItem("theme", "light");
    } else {
      localStorage.setItem("theme", "dark");
    }
  };

  const handleClearAll = () => {
    setData((prev) => {
      const _prev = { ...prev };
      _prev.value = "";
      _prev.lastUpdate = new Date().getTime();
      if (socket) socket.emit("updateText", _prev);
      return _prev;
    });
  };

  const handleCopyAll = () => {
    navigator.clipboard.writeText(data.value);
  };

  const handleRoomChange = (e: any) => {
    const value = e.target.value;
    setRoom(value);
  };

  const handleRoomJoin = () => {
    console.log("Room ", room);

    if (room === "") {
      if (socket) socket.emit("room", "");
    } else {
      if (socket) socket.emit("join", room);
    }
  };

  return (
    <div>
      {isServerConnected ? (
        <>
          <NavBar
            {...{
              handleToggleTheme,
              theme,
              users: user,
              handleClearAll,
              handleCopyAll,
            }}
          />
          <div style={{ marginTop: "3rem" }}></div>
          <div>
            Room Id : <input value={room} onChange={handleRoomChange} />
            <button onClick={handleRoomJoin}>Join</button>
          </div>
          <TextArea {...{ handleChange, theme, value: data.value }} />
        </>
      ) : (
        <ConnectingBanner />
      )}
    </div>
  );
};

export default App;

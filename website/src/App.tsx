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
  const [theme, setTheme] = useState<ThemeType>(themeColor.light);
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const _theme = localStorage.getItem("theme");
    if (_theme === "dark") setTheme(themeColor.dark);

    const _socket = io(config.BASE_URL);
    setSocket(_socket);
    _socket.emit("getText");
    _socket.on("success", (response: SuccessDataResponseType) => {
      if (data.lastUpdate !== response.data.lastUpdate) {
        setData((prev) => {
          const _prev = { ...prev };
          _prev.value = response.data.value;
          _prev.lastUpdate = response.data.lastUpdate;
          _prev.users = response.data.users;

          return _prev;
        });
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
      if (socket) socket.emit("updateText", _prev);
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

  return (
    <div>
      {isServerConnected ? (
        <>
          <NavBar
            {...{
              handleToggleTheme,
              theme,
              users: data.users,
              handleClearAll,
              handleCopyAll,
            }}
          />
          <TextArea {...{ handleChange, theme, value: data.value }} />
        </>
      ) : (
        <ConnectingBanner />
      )}
    </div>
  );
};

export default App;

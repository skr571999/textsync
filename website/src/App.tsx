import React, { useEffect, useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import TextArea from "./components/TextArea";
import { syncData } from "./services/apis";
import { DataType, ThemeType } from "./services/model";

const App = () => {
  const [data, setData] = useState<DataType>({
    lastUpdate: "",
    value: "",
  });

  const [theme, setTheme] = useState<ThemeType>({
    color: "#26262c",
    backgroundColor: "#eaeaea",
  });

  const [isSyncing, setIsSyncing] = useState(true);

  useEffect(() => {
    handleSync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;

    setData((prev) => {
      const _prev = { ...prev };
      _prev.value = value;
      _prev.lastUpdate = new Date().toString();
      return _prev;
    });
  };

  const handleSync = () => {
    (async () => {
      setIsSyncing(true);
      const response = await syncData(data);
      console.log("Response : ", response);

      if (data.lastUpdate !== response.data.lastUpdate) {
        setData((prev) => {
          const _prev = { ...prev };
          _prev.value = response.data.value;
          _prev.lastUpdate = response.data.lastUpdate;
          return _prev;
        });
      }
      setIsSyncing(false);
    })();
  };

  const handleToggleTheme = () => {
    setTheme({ backgroundColor: theme.color, color: theme.backgroundColor });
  };

  return (
    <div>
      <NavBar {...{ handleSync, handleToggleTheme, isSyncing, theme }} />
      <TextArea {...{ handleChange, theme, value: data.value }} />
    </div>
  );
};

export default App;

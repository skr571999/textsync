import React, { useEffect, useState } from "react";
import "./App.css";
import { syncData } from "./services/apis";

export interface DataType {
  lastUpdate: string;
  content: string;
}

const App = () => {
  const [data, setData] = useState<DataType>({
    lastUpdate: "",
    content: "",
  });

  useEffect(() => {
    handleSync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;

    setData((prev) => {
      const _prev = { ...prev };
      _prev.content = value;
      _prev.lastUpdate = new Date().toString();
      return _prev;
    });
  };

  const handleSync = async () => {
    const responseData = await syncData(data);

    if (data.lastUpdate !== responseData.data.lastUpdate) {
      setData((prev) => {
        const _prev = { ...prev };
        _prev.content = responseData.data.content;
        _prev.lastUpdate = responseData.data.lastUpdate;
        return _prev;
      });
    }

    console.log("Response : ", responseData);
  };

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark" style={{ height: "7vh" }}>
        <a className="navbar-brand" href="/" style={{ fontSize: "2.8vh" }}>
          <b>COPY</b>Paste
        </a>
        <div>
          <button className="btn btn-light btn-sm" onClick={handleSync}>
            Sync
          </button>
        </div>
      </nav>
      <div style={{ height: "93vh" }}>
        <textarea
          name="data"
          id="dataContainer"
          style={{
            minWidth: "100%",
            minHeight: "100%",
            resize: "none",
            border: "none",
          }}
          cols={30}
          rows={10}
          value={data.content}
          onChange={handleChange}
          placeholder="Paste here..."
        ></textarea>
      </div>
    </div>
  );
};

export default App;

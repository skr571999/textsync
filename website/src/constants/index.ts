import { DataValueType } from "../services/model";

export const themeColor = {
  light: {
    color: "#26262c",
    backgroundColor: "#eaeaea",
  },
  dark: {
    backgroundColor: "#26262c",
    color: "#eaeaea",
  },
};

export const defaultDataValue: DataValueType = {
  lastUpdate: new Date().getTime(),
  value: "",
  users: 0,
  room: "",
};

const prod = {
  BASE_URL: process.env.REACT_APP_SERVER_URL || "",
};

const dev = {
  BASE_URL: "http://localhost:8000",
};

export const config = process.env.NODE_ENV === "development" ? dev : prod;

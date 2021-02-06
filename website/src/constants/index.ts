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
  lastUpdate: "",
  value: "",
  users: 0,
};

const prod = {
  BASE_URL: "https://textsync.herokuapp.com",
};

const dev = {
  BASE_URL: "http://localhost:8000",
};

export const config = process.env.NODE_ENV === "development" ? dev : prod;

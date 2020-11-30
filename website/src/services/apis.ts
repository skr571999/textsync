import { DataType } from "../App";

// const BASE_URL = "http://localhost:8000/sync";
const BASE_URL = "https://copypaste01.herokuapp.com/api/";

interface SyncDataResponseType {
  message: string;
  data: DataType;
}

export const syncData = async (
  data: DataType
): Promise<SyncDataResponseType> => {
  try {
    const response = await fetch(BASE_URL + "sync", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return response.json();
  } catch (error) {
    console.log("Error : ", error);

    return error;
  }
};

import { config } from "../constants";
import { DataType, SyncDataResponseType } from "./model";

export const syncData = async (
  data: DataType
): Promise<SyncDataResponseType> => {
  try {
    const response = await fetch(config.BASE_URL + "sync", {
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

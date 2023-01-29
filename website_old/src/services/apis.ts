import { config } from "../constants";
import { DataValueType, SuccessDataResponseType } from "./model";

export const setData = async (
  data: DataValueType
): Promise<SuccessDataResponseType> => {
  try {
    const response = await fetch(config.BASE_URL + "/api/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return response.json();
  } catch (error: any) {
    console.log("Error : ", error);
    return error;
  }
};

export const getData = async (): Promise<SuccessDataResponseType> => {
  try {
    const response = await fetch(config.BASE_URL + "/api/data");
    return response.json();
  } catch (error: any) {
    console.log("Error : ", error);
    return error;
  }
};

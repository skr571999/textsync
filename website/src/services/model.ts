// export interface ThemeType {
//   color: string;
//   backgroundColor: string;
// }

export type ThemeType = "default" | "light" | "dark";

export interface DataValueType {
  lastUpdate: number;
  value: string;
  users: number;
}

export interface SuccessDataResponseType {
  status: string;
  data?: DataValueType;
  room_id?: string;
  users?: number;
}

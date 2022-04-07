export interface ThemeType {
  color: string;
  backgroundColor: string;
}

export interface DataValueType {
  lastUpdate: number;
  value: string;
  users: number;
  room: string;
}

export interface SuccessDataResponseType {
  status: string;
  data: DataValueType;
}

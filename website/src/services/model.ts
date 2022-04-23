export interface ThemeType {
  color: string;
  backgroundColor: string;
}

export interface DataValueType {
  lastUpdate: number;
  value: string;
  users: number;
}

export interface SuccessDataResponseType {
  status: string;
  data: DataValueType;
}

export interface ThemeType {
  color: string;
  backgroundColor: string;
}

export interface DataType {
  lastUpdate: string;
  value: string;
  users: number;
}

export interface SuccessDataResponseType {
  status: string;
  data: DataType;
}

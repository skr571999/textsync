export interface ThemeType {
  color: string;
  backgroundColor: string;
}

export interface DataType {
  lastUpdate: string;
  value: string;
}

export interface SyncDataResponseType {
  message: string;
  data: DataType;
}

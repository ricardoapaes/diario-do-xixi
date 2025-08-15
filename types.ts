
export enum LogStatus {
  Dry = 'DRY',
  Wet = 'WET',
}

export interface LogData {
  [date: string]: LogStatus;
}

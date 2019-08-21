import { LogLevel, Service, LogData } from "./log";

export interface TimeRange {
  startTime?: string;
  endTime?: string;
}

export interface LogConfig {
  refresh_time: number;
}

export interface LogFilters {
  keyword?: string;
  timeRange: TimeRange;
  level: LogLevel;
  services: Service[];
  logData: LogData[];
}

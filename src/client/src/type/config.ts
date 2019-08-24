import { LogLevel, Service, LogData, TimeRange } from "./Log";

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

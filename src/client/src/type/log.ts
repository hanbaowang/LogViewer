export enum LogLevel {
  ALL = "ALL",
  TRACE = "TRACE",
  DEBUG = "DEBUG",
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
  FATAL = "FATAL"
}

export interface Service {
  name: string;
  logs: ServiceLog[];
}

export interface ServiceLog {
  log_name: string;
  log_path: string;
}

export interface LogData {
  timestamp: number;
  level: LogLevel;
  content: string;
}

export interface LogsReqParams {
  service: string;
  logs?: string;
  start_time?: string;
  end_time?: string;
  contain?: string;
}

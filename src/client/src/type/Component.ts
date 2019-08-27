import { TimeRange, LogData } from './Log';
import { LogConfig, LogFilters } from './Config';

export interface AppState {
  error: string | null;
  info: string | null;
  first: boolean;
}

export interface LogViewerProps {
  first?: boolean;
}

export interface LogViewerState extends LogFilters {
  visible: boolean;
}

export interface ConfigDrawerProps {
  logConfig: LogConfig;
  visible: boolean;
  onClose: any;
}

export interface LogListProps {
  keyword: string | undefined;
  timeRange: TimeRange;
  level: string;
  curLog: string[];
}

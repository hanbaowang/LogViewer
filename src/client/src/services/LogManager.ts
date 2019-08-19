import getServices, { Service } from "./ServicesLoader";
import getLogData, { LogData } from "./LogDataLoader";
import { Moment } from "moment";
import { dateFormatter } from "../config/DefaultConfig";

interface LogFilter {
  keyword: string;
  timeRange: TimeRange;
  level: LogLevel;
}

interface TimeRange {
  startTime: string;
  endTime: string;
}

export enum LogLevel {
  ALL = 0,
  TRACE = 1,
  DEBUG = 2,
  INFO = 3,
  WARN = 4,
  ERROR = 5,
  FATAL = 6
}

export default class LogManager {
  private _logFilter: LogFilter = {
    keyword: "",
    timeRange: {
      startTime: "",
      endTime: ""
    },
    level: LogLevel.ALL
  };
  private _services: Service[] = [];
  private _logData: LogData[] = [];

  get logFilter(): LogFilter {
    return this._logFilter;
  }

  get services(): Service[] {
    return this._services;
  }

  get logData(): LogData[] {
    return this._logData;
  }

  set level(value: LogLevel) {
    this._logFilter.level = value;
  }

  set timeRange(range: [Moment, Moment]) {
    this._logFilter.timeRange.startTime = range[0].format(dateFormatter);
    this._logFilter.timeRange.startTime = range[1].format(dateFormatter);
  }

  loadServices = async (): Promise<void> => {
    this._services = await getServices();
  };

  /**
   * single log file support
   * @param {logs} string is expected to be string[]
   */
  loadLogData = async (service: string, logs: string): Promise<void> => {
    const params = {
      service,
      logs,
      start_time: this._logFilter.timeRange.startTime,
      end_time: this._logFilter.timeRange.endTime,
      contain: this._logFilter.keyword
    };
    this._logData = await getLogData(params);
  };

  load = () => {
    return new Promise((resolve, reject) => {
      this.loadServices();
      // this.loadLogData()
    });
  };
}

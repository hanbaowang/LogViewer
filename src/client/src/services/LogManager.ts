import { LogFilters } from "../type/Config";
import { Service, LogData, LogLevel, TimeRange } from "../type/Log";
import getServices from "./ServicesLoader";
import getLogData from "./LogDataLoader";

export default class LogManager {
  private _logFilters: LogFilters = {
    level: LogLevel.ALL,
    services: [],
    timeRange: {},
    logData: []
  };

  // private _logDataOrigin: LogData[] = [];

  get services(): Service[] {
    return this._logFilters.services;
  }

  get logData(): LogData[] {
    return this._logFilters.logData;
  }

  get level(): LogLevel {
    return this._logFilters.level;
  }

  get keyword(): string {
    return typeof this._logFilters.keyword === "undefined"
      ? ""
      : this._logFilters.keyword;
  }

  get logFilters(): LogFilters {
    return this._logFilters;
  }

  set level(value: LogLevel) {
    this._logFilters.level = value;
  }

  get timeRange(): TimeRange {
    return this._logFilters.timeRange;
  }

  // TODO format is not correct here
  set timeRange(range: TimeRange) {
    this._logFilters.timeRange.startTime = range.startTime;
    this._logFilters.timeRange.endTime = range.endTime;
  }

  set keyword(value: string) {
    this._logFilters.keyword = value;
  }

  loadServices = async (): Promise<void> => {
    this._logFilters.services = await getServices();
  };

  /**
   * single log file support
   * @param {logs} string is expected to be string[]
   */
  loadLogData = async (service: string, logs: string): Promise<void> => {
    const params = {
      service,
      logs,
      start_time: this._logFilters.timeRange.startTime,
      end_time: this._logFilters.timeRange.endTime,
      contain: this._logFilters.keyword
    };
    this._logFilters.logData = await getLogData(params);
  };

  load = () => {
    return new Promise((resolve, reject) => {
      this.loadServices();
      // this.loadLogData()
    });
  };
}

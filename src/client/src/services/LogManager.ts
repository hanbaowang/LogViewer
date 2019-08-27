import { LogFilters } from '../type/Config';
import { Service, LogData, LogLevel, TimeRange } from '../type/Log';
import getServices from './ServicesLoader';
import getLogData from './LogDataLoader';

export default class LogManager {
  // TODO for configurable default service's logs
  constructor(defalutConfig: any = []) {
    this._logFilters.curLog = defalutConfig;
  }

  private _logFilters: LogFilters = {
    level: LogLevel.ALL,
    timeRange: {},
    curLog: []
  };

  private _services: Service[] = <Service[]>[];

  get services() {
    return this._services;
  }

  // TODO type
  get curLog() {
    return this._logFilters.curLog;
  }

  set curLog(value) {
    this._logFilters = <LogFilters>{};
    this._logFilters.curLog = value;
    this._logFilters.timeRange = {};

    this._logFilters.level = LogLevel.ALL;
  }

  get level(): LogLevel {
    return this._logFilters.level;
  }

  set level(value: LogLevel) {
    this._logFilters.level = value;
  }

  get keyword(): string {
    return typeof this._logFilters.keyword === 'undefined' ? '' : this._logFilters.keyword;
  }

  set keyword(value: string) {
    this._logFilters.keyword = value;
  }

  get timeRange(): TimeRange {
    return this._logFilters.timeRange;
  }

  // TODO format is not correct here
  set timeRange(range: TimeRange) {
    this._logFilters.timeRange.startTime = range.startTime;
    this._logFilters.timeRange.endTime = range.endTime;
  }

  get logFilters(): LogFilters {
    return this._logFilters;
  }

  loadServices = async (): Promise<void> => {
    this._services = await getServices();
  };

  load = () => {
    return new Promise((resolve, reject) => {
      this.loadServices();
    });
  };
}

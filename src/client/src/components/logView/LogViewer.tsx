import React from "react";
import moment from "moment";
import { Input } from "antd";
import { DatePicker } from "antd";

import LogLevelFilter from "./logLevelFilter";
import LogSelector from "./LogSelector";
import LogList from "./LogList";
import LogManager from "../../services/LogManager";
import { dateFormatter } from "../../config/DefaultConfig";
import { RangePickerValue } from "antd/lib/date-picker/interface";
import { LogLevel } from "../../type/log";
import { isundefined } from "../../utils/common";

const { Search } = Input;
const { RangePicker } = DatePicker;

export default class LogView extends React.Component {
  private logManager: LogManager;

  constructor(props: any) {
    super(props);
    this.logManager = new LogManager();
    this.state = this.logManager.logFilters;
    console.log(this.logManager);
  }

  componentDidMount = (): void => {
    this.logManager
      .loadServices()
      .then(() => {
        this.setState(this.logManager.logFilters);
      })
      .catch(() => {
        this.setState(this.logManager.logFilters);
      });
  };

  onSearch = (keyword: string, event: any): void => {
    console.log("=====search=====");
    console.log(keyword);
    console.log(event);
    this.logManager.keyword = keyword
  };

  onTimeRangeChange = (
    datas: RangePickerValue,
    timeRange: [string, string]
  ): void => {
    console.log("=====time=====");
    console.log(datas);
    console.log(timeRange);
    this.logManager.timeRange = [moment(timeRange[0]), moment(timeRange[1])];
  };

  onLevelChange = (level: string): void => {
    console.log("=====level=====");
    console.log(level);
    const levels = [
      LogLevel.ALL,
      LogLevel.TRACE,
      LogLevel.DEBUG,
      LogLevel.INFO,
      LogLevel.WARN,
      LogLevel.ERROR,
      LogLevel.FATAL
    ];
    const index = Object.keys(LogLevel).indexOf(level);
    this.logManager.level = levels[index < 0 ? 0 : index];
    this.setState(this.logManager.logFilters);
    console.log(this.logManager)
  };

  onServiceChange = (service: [string, string]): void => {
    console.log("=====service=====");
    console.log(service);
    this.logManager
      .loadLogData(service[0], service[1])
      .then(() => {
        this.setState({
          logData: this.logManager.logData
        });
      })
      .catch(() => { });
  };

  render = () => {
    const { timeRange, level, services, logData } = this.logManager.logFilters;
    const { startTime, endTime } = timeRange;
    // TODO defaultTime 类型巨坑……
    let defaultTime;
    if (isundefined(startTime) || isundefined(endTime)) {
      defaultTime = undefined
    } else {
      defaultTime = [moment(startTime), moment(endTime)]
    }

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "10px 24px"
        }}
      >
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <div
            style={{
              padding: "10px 24px",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <Search
              placeholder="请输入关键词..."
              enterButton="Search"
              onSearch={this.onSearch.bind(this)}
              style={{ margin: "0 0 10px 0px" }}
            />
            <RangePicker
              defaultValue={undefined}
              format={dateFormatter}
              onChange={this.onTimeRangeChange.bind(this)}
            />
            <LogLevelFilter
              level={level}
              onChange={this.onLevelChange.bind(this)}
            />
          </div>
          <LogSelector
            config={services}
            onChange={this.onServiceChange.bind(this)}
          />
        </div>
        <div
          style={{
            margin: "15px 0px"
          }}
        >
          <LogList data={logData} />
        </div>
      </div>
    );
  };
}

import React from 'react';
import moment from 'moment';
import { Input, Icon } from 'antd';
import { DatePicker } from 'antd';

import '../../css/LogViewer.css';

import { LogLevel, Service } from '../../type/Log';
import { LogViewerState, LogViewerProps } from '../../type/Component';
import { isundefined } from '../../utils/Common';
import defaultConfig, { dateFormatter } from '../../config/DefaultConfig';
import LogLevelFilter from './logLevelFilter';
import LogSelector from './LogSelector';
import LogList from './LogList';
import LogManager from '../../services/LogManager';
import ConfigDrawer from '../config/ConfigDrawer';
import { RangePickerValue } from 'antd/lib/date-picker/interface';

const { Search } = Input;
const { RangePicker } = DatePicker;

export default class LogViewer extends React.Component<LogViewerProps, LogViewerState> {
  private logManager: LogManager;

  constructor(props: any) {
    super(props);
    this.logManager = new LogManager();
    this.state = {
      ...this.logManager.logFilters,
      visible: false
    };
  }

  render = () => {
    console.log(this.logManager)
    const service = this.logManager.services;
    const visible = this.state.visible;
    const { timeRange, level, keyword, curLog } = this.logManager.logFilters;
    const { startTime, endTime } = timeRange;
    // TODO defaultTime 类型巨坑……
    let defaultTime: RangePickerValue;
    if (isundefined(startTime) || isundefined(endTime)) {
      defaultTime = [undefined];
    } else {
      defaultTime = [moment(startTime), moment(endTime)];
    }

    return (
      <div>
        <div className="flex-column margin-around">
          <div className="flex-row">
            <div className="flex-column">
              <img
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K"
                alt="logo"
                style={{
                  height: '60px',
                  width: '60px',
                  margin: '0px 30px 0px 10px',
                  alignSelf: 'center'
                }}
              />
            </div>
            <div className="flex-column">
              <div className="flex-column-item">
                <RangePicker
                  className="inline-full-width"
                  defaultValue={defaultTime}
                  format={dateFormatter}
                  onChange={this.onTimeRangeChange.bind(this)}
                />
              </div>
              <div className="flex-column-item">
                <LogLevelFilter level={level} onChange={this.onLevelChange.bind(this)} />
              </div>
            </div>
            <div className="flex-column flex-item_grow" style={{ marginLeft: '60px' }}>
              <div className="flex-column-item">
                <LogSelector
                  first={this.props.first}
                  config={service}
                  onChange={this.onLogChange.bind(this)}
                />
              </div>
              <div className="flex-column-item">
                <Search
                  placeholder="请输入关键词..."
                  onSearch={this.onSearch.bind(this)}
                  className="logViewer-config-filter_search"
                />
              </div>
            </div>
            <div className="logViewer-settings">
              <Icon type="left-circle" theme="filled" onClick={this.showDrawer.bind(this)} />
              <ConfigDrawer
                visible={visible}
                logConfig={defaultConfig}
                onClose={this.onClose.bind(this)}
              />
            </div>
          </div>

          <div className="padding-around">
            <LogList
              keyword={keyword}
              timeRange={timeRange}
              level={level}
              curLog={curLog}
            />
          </div>
        </div>
      </div>
    );
  };

  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };

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
    this.logManager.keyword = keyword;
    this.setState(this.logManager.logFilters);
  };

  onTimeRangeChange = (datas: any, timeRange: [string, string]): void => {
    this.logManager.timeRange = {
      startTime: datas[0].valueOf().toString(),
      endTime: datas[1].valueOf().toString()
    };
    this.setState(this.logManager.logFilters);
  };

  onLevelChange = (level: string): void => {
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
  };

  onLogChange = (curLog: string[]): void => {
    this.logManager.curLog = curLog
    this.setState(this.logManager.logFilters);
  };
}

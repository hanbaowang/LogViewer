import React from "react";
import { Input } from "antd";
import { DatePicker } from "antd";
import LogLevelFilter from "./logLevelFilter";
import { dateFormatter } from "../../config/DefaultConfig";

const { Search } = Input;
const { RangePicker } = DatePicker;
/**
 *
 * @param {*} props
 */
export default function LogFilter(props) {
  return (
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
        onSearch={props.onChange.bind(this, "search")}
        style={{ margin: "0 0 10px 0px" }}
      />
      <RangePicker
        defaultValue={[
          props.config.timeRange.startTime,
          props.config.timeRange.endTime
        ]}
        format={dateFormatter}
        onChange={props.onChange.bind(this, "timeRange")}
      />
      <LogLevelFilter
        level={props.config.level}
        onChange={props.onChange.bind(this, "level")}
      />
    </div>
  );
}

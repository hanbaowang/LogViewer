import React, { useState } from "react";
import { Input } from "antd";
import { DatePicker } from "antd";
import moment from "moment";

import LogLevelFilter from "./logLevelFilter";

const { Search } = Input;
const { RangePicker } = DatePicker;

const dateFormatter = "YYYY-MM-DD hh:mm";

function logLevelChange(level) {
  console.log(level);
}

function doSearch(value) {
  // alert(value)
}

/**
 * props.level
 * props.timeRange [default: [minTimestamp, maxTimestamp]]
 */
export default function LogFilter(props) {
  const [keyword, setKeyword] = useState("");
  const [startTime, setStartTime] = useState(props.config.timeRange[0]);
  const [endTime, setEndTime] = useState(props.config.timeRange[1]);

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
        onSearch={value => {
          doSearch(value);
        }}
        style={{ margin: "0 0 10px 0px" }}
      />
      <RangePicker
        defaultValue={[
          moment(startTime),
          moment(endTime)
        ]}
        format={dateFormatter}
      />
      <LogLevelFilter
        level={props.config.level}
        onClick={level => {
          logLevelChange(level);
        }}
      />
    </div>
  );
}

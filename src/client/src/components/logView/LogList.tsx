import React from "react";
import { Table } from "antd";
import { timeStr2String } from "../../utils/common";
import { logListColumns } from "../../config/DefaultConfig";
import { LogListProps, LogData, LogLevel } from "../../type/Log";

export default function LogList(props: LogListProps) {
  const { keyword = "", timeRange = {}, level = LogLevel.ALL, data } = props;
  const lines = [];
  for (let i = 0; i < data.length; i++) {
    const lineData: LogData = data[i];
    const _rightLevel: boolean =
      level === LogLevel.ALL || lineData.level === level;
    const _containKeyword: boolean =
      keyword === "" || lineData.content.indexOf(keyword) >= 0;
    let _betweenRange: boolean = true;
    if (timeRange.startTime && timeRange.endTime) {
      _betweenRange =
        lineData.timestamp >= timeRange.startTime &&
        lineData.timestamp <= timeRange.endTime;
    }

    if (_rightLevel && _containKeyword && _betweenRange) {
      lines.push({
        key: i,
        displayTime: timeStr2String(data[i].timestamp),
        level: data[i].level,
        content: data[i].content,
        timestamp: new Date(parseInt(data[i].timestamp))
      });
    }
  }
  return <Table dataSource={lines} columns={logListColumns} size="middle" />;
}

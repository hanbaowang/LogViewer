import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { timeStr2String, regexCheck, isundefined } from "../../utils/Common";
import { logListColumns } from "../../config/DefaultConfig";
import { LogData, LogLevel } from "../../type/Log";
import { LogListProps } from "../../type/Component";
import getLogData from "../../services/LogDataLoader";
import { validateService, validateLogName } from "../../utils/Regex";

export default function LogList(props: LogListProps) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const { keyword = "", timeRange = {}, level = LogLevel.ALL, curLog = [] } = props;

  async function fetchData() {
    setLoading(true);
    console.log("fetch check...")
    if (curLog.length < 2 || !regexCheck(validateService, curLog[0]) || !regexCheck(validateLogName, curLog[1])) {
      console.log("fetch check error...")

      setLoading(false);
      setData([])
      return
    }
    const params = {
      service: curLog[0],
      logs: curLog[1],
      start_time: timeRange.startTime,
      end_time: timeRange.endTime,
      contain: keyword
    };
    console.log("fetch start...")
    const data = await getLogData(params);

    setData(data);
    setLoading(false)
  }

  useEffect(() => {
    fetchData();
  }, [props.curLog])

  // TODO type
  function processData(data: LogData[] = []): any[] {
    if (data === null || data.length === 0) {
      return []
    }
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
    return lines;
  }
  return <Table loading={loading} dataSource={processData(data)} columns={logListColumns} size="middle" />;
}

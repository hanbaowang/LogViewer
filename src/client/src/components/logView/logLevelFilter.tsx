import React from "react";
import { Radio, Button } from "antd";
import { LogLevel } from "../../type/Log";

export default function LogLevelFilter(props: any) {
  return (
    <div className="search">
      <Button type="primary" style={{ marginRight: "10px" }}>
        日志级别
      </Button>
      <Radio.Group
        defaultValue={props.level}
        value={props.level}
        onChange={e => {
          props.onChange(e.target.value);
        }}
        buttonStyle="solid"
      >
        <Radio.Button value={LogLevel.ALL}>ALL</Radio.Button>
        <Radio.Button value={LogLevel.TRACE}>TRACE</Radio.Button>
        <Radio.Button value={LogLevel.DEBUG}>DEBUG</Radio.Button>
        <Radio.Button value={LogLevel.INFO}>INFO</Radio.Button>
        <Radio.Button value={LogLevel.WARN}>WARN</Radio.Button>
        <Radio.Button value={LogLevel.ERROR}>ERROR</Radio.Button>
        <Radio.Button value={LogLevel.FATAL}>FATAL</Radio.Button>
      </Radio.Group>
    </div>
  );
}

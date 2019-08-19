import React, { useState } from "react";
import { Radio, Button } from "antd";

const LOGLEVEL = {
  DEBUG: "DEBUG",
  INFO: "INFO",
  WARNING: "WARNING",
  ERROR: "ERROR"
};

export default function LogLevelFilter(props) {
  const [level, setLevel] = useState(props.level);

  const curLevel =
    Object.keys(LOGLEVEL).indexOf(level) < 0 ? LOGLEVEL.INFO : LOGLEVEL[level];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "10px"
      }}
    >
      <Button type="primary" style={{ marginRight: "5px" }}>
        日志级别
      </Button>
      <Radio.Group
        defaultValue={curLevel}
        value={curLevel}
        onChange={e => {
          setLevel(e.target.value);
          props.onClick(e.target.value)
        }}
        buttonStyle="solid"
      >
        <Radio.Button value={LOGLEVEL.DEBUG}>DEBUG</Radio.Button>
        <Radio.Button value={LOGLEVEL.INFO}>INFO</Radio.Button>
        <Radio.Button value={LOGLEVEL.WARNING}>WARNING</Radio.Button>
        <Radio.Button value={LOGLEVEL.ERROR}>ERROR</Radio.Button>
      </Radio.Group>
    </div>
  );
}

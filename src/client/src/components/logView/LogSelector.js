import React, { useState, useEffect } from "react";
import { Cascader } from "antd";
import getServices from "../../services/ServicesLoader";

export default function LogSelector(props) {
  const [curLog, setCurLog] = useState("");
  const [services, setServices] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const resp = await getServices();
      setServices(resp)
    }
    fetchData()
  },[]);

  function filter(inputValue, path) {
    return path.some(
      option =>
        option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
    );
  }

  return (
    <div
      style={{
        padding: "10px 24px",
        whiteSpace: "nowrap",
        fontWeight: "bold"
      }}
    >
      <span>日志配置：&nbsp;&nbsp;</span>
      <Cascader
        size="default"
        options={services}
        onChange={props.LogSelectoronChange}
        placeholder="请选择日志..."
        showSearch={{ filter }}
        style={{ width: "500px" }}
      />
    </div>
  );
}

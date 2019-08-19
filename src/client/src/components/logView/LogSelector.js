import React, { useState, useEffect } from "react";
import { Cascader } from "antd";
import getServices from "../../services/ServicesLoader";

function filter(inputValue, path) {
  return path.some(
    option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
  );
}

function trans2CascaderOptions(serviceRsps) {
  const options = [];
  serviceRsps.forEach(serviceRsp => {
    const service = {};
    service.value = serviceRsp.name;
    service.label = serviceRsp.name;
    service.children = [];
    for (let log of serviceRsp.logs) {
      service.children.push({
        value: log.log_name,
        label: log.log_path
      });
    }
    options.push(service);
  });

  return options;
}

export default function LogSelector(props) {
  const serviceOptions = trans2CascaderOptions(props.config);

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
        options={serviceOptions}
        onChange={props.onChange.bind(this,'select')}
        placeholder="请选择日志..."
        showSearch={{ filter }}
        style={{ width: "500px" }}
      />
    </div>
  );
}

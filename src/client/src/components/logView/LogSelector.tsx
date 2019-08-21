import React from "react";
import { Cascader } from "antd";
import { Service } from "../../type/Log";
import { CascaderOptionType } from "antd/lib/cascader";

function trans2CascaderOptions(serviceRsps: Service[]): CascaderOptionType[] {
  const options: CascaderOptionType[] = [];
  serviceRsps.forEach(serviceRsp => {
    const service: CascaderOptionType = {};
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

export default function LogSelector(props: any) {
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
        onChange={props.onChange}
        placeholder="请选择日志..."
        showSearch={true}
        style={{ width: "500px" }}
      />
    </div>
  );
}

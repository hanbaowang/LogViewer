import React from "react";
import { Cascader } from "antd";
import { Service } from "../../type/Log";
import { CascaderOptionType } from "antd/lib/cascader";
import { isundefined } from "../../utils/Common";

function trans2CascaderOptions(serviceRsps: Service[]): CascaderOptionType[] {
  const options: CascaderOptionType[] = [];
  serviceRsps.forEach(serviceRsp => {
    const service: CascaderOptionType = {};
    service.value = serviceRsp.name;
    service.label = serviceRsp.name;
    service.children = [];
    if (serviceRsp.logs) {
      for (let log of serviceRsp.logs) {
        service.children.push({
          value: log.log_name,
          label: log.log_path
        });
      }
      options.push(service);
    }
  });

  return options;
}

function getDefaultValue(defaultValue: string, options: CascaderOptionType[]): string[] | undefined {
  if (!isundefined(defaultValue)) return [defaultValue];

  if (options.length === 0) return undefined

  return undefined
}

export default function LogSelector(props: any) {
  // TODO 这里应该转换好了传进来
  const serviceOptions = trans2CascaderOptions(props.config);
  const { first } = props;
  const firstLoadClass = first || isundefined(props.defaultValue) || props.defaultValue === "" ? "" : ""

  let defaultValue: string[] | undefined = getDefaultValue(props.defaultValue, serviceOptions);


  return (

    <div className="flex-row logViewer-logSelector">
      <span>日志配置：&nbsp;&nbsp;</span>
      <Cascader
        allowClear={false}
        size="default"
        defaultValue={defaultValue}
        options={serviceOptions}
        onChange={props.onChange}
        placeholder="请选择日志..."
        showSearch={true}
        displayRender={label => label.join(" > ")}
        className={`inline-full-width ${firstLoadClass}`}
      />
    </div>
  );
}

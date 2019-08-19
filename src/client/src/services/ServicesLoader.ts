import axios from "axios";
import { CascaderOptionType } from "antd/lib/cascader";
import config from "../config/Config";
import Ajax from "../utils/HttlUtils";

export interface Service {
  name: string;
  logs: ServiceLog[];
}

interface ServiceLog {
  log_name: string;
  log_path: string;
}

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

export default async function getServices() {
  let services: CascaderOptionType[] = await Ajax.get<Service[]>("/services")
    .then(resp => trans2CascaderOptions(resp.data))
    .catch(() => trans2CascaderOptions(config.getServicesResp));
  return services;
}

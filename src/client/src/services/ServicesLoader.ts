import config from "../config/Config";
import Ajax from "../axios/Ajax";
import { URLS } from "../axios/config";

export interface Service {
  name: string;
  logs: ServiceLog[];
}

interface ServiceLog {
  log_name: string;
  log_path: string;
}

export default async function getServices() {
  let services: Service[] = await Ajax.get<Service[]>(URLS.SERVICES)
    .then(resp => resp.data)
    .catch(resp => config.getServicesResp);
  return services;
}

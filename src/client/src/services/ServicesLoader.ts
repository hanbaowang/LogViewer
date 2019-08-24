import { URLS } from "../axios/config";
import { Service } from "../type/Log";
import config from "../config/Config";
import Ajax from "../axios/Ajax";


export default async function getServices() {
  let services: Service[] = await Ajax.get<Service[]>(URLS.SERVICES)
    .then(resp => resp.data)
    .catch(resp => config.getServicesResp);
  return services;
}

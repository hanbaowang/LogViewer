import { URLS } from '../axios/config';
import { Service } from '../type/Log';
import config from '../config/Config';
import Ajax from '../axios/Ajax';
import { message } from 'antd';

export default async function getServices() {
  let services: Service[] = await Ajax.get<Service[]>(URLS.SERVICES)
    .then(resp => {
      if (resp.error_code === 0) return resp.data;
      else {
        message.error('获取服务信息失败..');
        return config.getServicesResp;
      }
    })
    .catch(resp => {
      message.error('获取服务信息失败..');
      return config.getServicesResp;
    });
  return services;
}

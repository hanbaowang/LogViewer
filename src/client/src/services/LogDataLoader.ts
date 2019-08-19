import config from "../config/Config";
import Ajax from "../axios/Ajax";
import { URLS } from "../axios/config";
import { LogLevel } from "./LogManager";

export interface LogData {
  timestamp: number;
  level: LogLevel;
  content: string;
}

// TODO encode
interface getLogsReqParams {
  service: string;
  logs?: string;
  start_time?: string;
  end_time?: string;
  contain?: string;
}

export default async function getLogData(params: getLogsReqParams) {
  let logData: LogData[] = await Ajax.get<LogData[]>(URLS.LOGDATA, {
    params
  })
    .then(resp => resp.data)
    .catch(resp => [{
      timestamp:111,
      level:1,
      content:'hahaha'
    }]);
  return logData;
}

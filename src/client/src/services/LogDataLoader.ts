import { URLS } from "../axios/config";
import { LogsReqParams, LogData, LogLevel } from "../type/log";
import Ajax from "../axios/Ajax";

export default async function getLogData(params: LogsReqParams) {
  let logData: LogData[] = await Ajax.get<LogData[]>(URLS.LOGDATA, {
    params
  })
    .then(resp => resp.data)
    .catch(resp => [
      {
        timestamp: 111,
        level: LogLevel.INFO,
        content: "hahaha"
      }
    ]);
  return logData;
}

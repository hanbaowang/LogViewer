import { URLS } from "../axios/config";
import { LogsReqParams, LogData } from "../type/Log";
import Ajax from "../axios/Ajax";

export default async function getLogData(params: LogsReqParams) {
  let logData: LogData[] = await Ajax.get<LogData[]>(URLS.LOGDATA, {
    params
  })
    .then(resp => resp.data)
    .catch(resp => [
      {
        timestamp: Date.now().toString(),
        level: "INFO",
        content: "hahaha"
      },
      {
        timestamp: Date.now().toString(),
        level: "ERROR",
        content:
          "TypeScript error in F:/01 repository/01 github/08 LogView/LogViewer/src/client/src/components/logView/LogSelector.tsx(3,25)TypeScript error in F:/01 repository/01 github/08 LogView/LogViewer/src/client/src/components/logView/LogSelector.tsx(3,25)"
      }
    ]);
  return logData;
}

import { dateFormatter } from "../config/DefaultConfig";
import moment from "moment";

export function isundefined(value: any): boolean {
  return typeof value === "undefined" ? true : false;
}

export function timeStr2String(
  timestamp: string,
  formatter: string = dateFormatter
): string {
  return moment(parseInt(timestamp)).format(formatter);
}

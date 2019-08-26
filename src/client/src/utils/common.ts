import { dateFormatter } from '../config/DefaultConfig';
import moment from 'moment';

/**
 *
 * @export
 * @param {*} value
 * @returns {boolean}
 */
export function isundefined(value: any): boolean {
  return typeof value === 'undefined' ? true : false;
}

/**
 * timestamp string To moment instance
 *
 * @export
 * @param {string} timestamp
 * @param {string} [formatter=dateFormatter]
 * @returns {string}
 */
export function timeStr2String(timestamp: string, formatter: string = dateFormatter): string {
  return moment(parseInt(timestamp)).format(formatter);
}

/**
 * regular expression test util
 *
 * @export
 * @param {string} expStr
 * @param {string} inputStr
 * @returns {boolean}
 */
export function regexCheck(expStr: string, inputStr: string): boolean {
  const reg = new RegExp(expStr);
  return reg.test(inputStr);
}

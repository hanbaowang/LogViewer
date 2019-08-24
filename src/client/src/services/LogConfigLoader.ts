import { LogConfig } from "../type/Config";
import defaultConfig from "../config/DefaultConfig";

export default class LogConfigLoader {
  private _config: LogConfig;

  constructor() {
    this._config = {
      refresh_time: defaultConfig.refresh_time
    };
  }

  get config(): LogConfig {
    return this._config;
  }

  set config(config: LogConfig) {
    this._config = config;
  }

  load() {

  }
}

import React from "react";
import LogFilter from "./LogFilter";
import defaultConfig from "../../config/Config";
import LogSelector from "./LogSelector";
import LogConfigLoader from "../../services/LogConfigLoader";
import LogList from "./LogList";

// timeRange 未配置的场景下应当显示空，有配置场景下应当根据日志min/max 时间戳显示
const timeRange = [Date.now() - 1000000, Date.now()];
const filterConfig = Object.assign({}, defaultConfig.filter, { timeRange });
// TODO getLog ajax's response
const logPathConfig = defaultConfig.logs;

export default class LogView extends React.Component {
  render = () => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "10px 24px"
        }}
      >
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <LogFilter config={filterConfig} />
          <LogSelector config={logPathConfig} />
        </div>
        <div
          style={{
            // backgroundColor: "rgb(229,236,243)",
            margin: "15px 0px"
            // borderRadius: "20px"
          }}
        >
          <LogList />
        </div>
      </div>
    );
  };
}

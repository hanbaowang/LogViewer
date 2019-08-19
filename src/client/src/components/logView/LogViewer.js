import React from "react";
import LogFilter from "./LogFilter";
import LogSelector from "./LogSelector";

import LogList from "./LogList";
import LogManager from "../../services/LogManager";

export default class LogView extends React.Component {
  constructor(props) {
    super(props);
    this.logManager = new LogManager();
    this.state = {
      logFilter: this.logManager.logFilter,
      services: this.logManager.services,
      logData: this.logManager.logData
    };
    console.log(this.logManager);
  }

  componentDidMount = () => {
    this.logManager
      .loadServices()
      .then(() => {
        this.setState({
          logFilter: this.logManager.logFilter,
          services: this.logManager.services,
          logData: this.logManager.logData
        });
      })
      .catch(() => {
        this.setState({
          logFilter: this.logManager.logFilter,
          services: this.logManager.services,
          logData: this.logManager.logData
        });
      });
  };

  onLogFilterChange = (catlog, eventData) => {
    switch (catlog) {
      case "select":
        console.log(eventData);
        this.logManager
          .loadLogData(eventData[0], eventData[1])
          .then(() => {
            this.setState({
              logData:this.logManager.logData
            })
          })
          .catch(() => {
          });
        break;
      case "level":
        this.logManager.level = eventData;
        this.setState({
          logFilter: this.logManager.logFilter
        });
      default:
        console.log(eventData, catlog);
    }
  };

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
          <LogFilter
            config={this.state.logFilter}
            onChange={this.onLogFilterChange.bind(this)}
          />
          <LogSelector
            config={this.state.services}
            onChange={this.onLogFilterChange.bind(this)}
          />
        </div>
        <div
          style={{
            // backgroundColor: "rgb(229,236,243)",
            margin: "15px 0px"
            // borderRadius: "20px"
          }}
        >
          <LogList data={this.state.logData} />
        </div>
      </div>
    );
  };
}

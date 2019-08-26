import "./css/App.css";
import React from "react";
import Menu from "antd/es/menu";
import Layout from "antd/es/layout";
import LogViewer from "./components/logView/LogViewer";
import { AppState } from "./type/Component";

const { Footer, Content } = Layout;

export default class App extends React.Component<{}, AppState> {

  state = {
    error: null,
    info: null,
    first: true
  }

  componentDidMount = () => {
    this.setState({
      first: false
    })
  }

  render = () => {
    const { first } = this.state
    return (
      <div>
        {this.state.error ? this.renderErrorPage() : this.renderLogViewer(first)}
      </div>
    );
  };

  renderLogViewer = (first: boolean): JSX.Element => {
    return (
      <div className="App">
        <Layout style={{ flexDirection: "column" }}>
          <Content className="contentView">
            <LogViewer first={first} />
          </Content>
          <Footer className="footerView">
            LogViewer @{new Date().getFullYear()} Made By Hanbaowang
          </Footer>
        </Layout>
      </div>
    )
  };

  renderErrorPage = (): JSX.Element => {
    return (
      <div>
        404
      </div>
    )
  }
}

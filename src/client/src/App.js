import "./App.css";
import React from "react";
import Menu from "antd/es/menu";
import Layout from "antd/es/layout";
import LogView from "./components/logView/LogView"

const { Footer, Sider, Content } = Layout;
const { Item } = Menu;

function App() {
  return (
    <div className="App">
      <Layout style={{ height: "100vh" }}>
        <Sider>
          <div
            className="logo"
            style={{
              height: "80px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
            <img
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K"
              alt="logo"
              style={{ height: "40px", width: "40px", alignSelf: "center" }}
            />
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Item key="1">日志分析</Item>
            <Item key="2">Config</Item>
          </Menu>
        </Sider>
        <Layout style={{ flexDirection: "column" }}>
          <Content style={{ height: "calc( 100vh - 3.5rem)" ,backgroundColor:'white'}}>
            <LogView/>
          </Content>
          <Footer
            style={{
              height: "3.5rem",
              verticalAlign: "middle",
              color: "rgb(172,172,172)",
              backgroundColor:'white'
            }}
          >
            LogAggr@{new Date().getFullYear()} Made By hanbaowang
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;

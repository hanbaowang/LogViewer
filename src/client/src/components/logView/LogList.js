import React, { useState } from "react";
import { Table } from "antd";

export default function LogList(props) {
  const [logs, setLogs] = useState([]);

  const dataSource = [
    {
      key: "1",
      name: "adad",
      age: 32,
      address: "asdawwwwwwwdad awdaw"
    },
    {
      key: "2",
      name: "KJHJKHBKJ",
      age: 'INFO',
      address: "adawdawd"
    }
  ];

  const columns = [
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
      width:250,
      className:"tableContentFontSize"
    },
    {
      title: "年龄",
      dataIndex: "age",
      key: "age",
      width:150,
      className:"tableContentFontSize"
    },
    {
      title: "住址",
      dataIndex: "address",
      key: "address",
      className:"tableContentFontSize"
    }
  ];

  return <Table dataSource={dataSource} columns={columns} size="middle" />;
}

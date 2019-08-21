import React from "react";
import { Table } from "antd";

export default function LogList(props: any) {

  const columns = [
    {
      title: "时间",
      dataIndex: "timestamp",
      key: "timestamp",
      width: 250,
      className: "tableContentFontSize"
    },
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
      width: 150,
      className: "tableContentFontSize"
    },
    {
      title: "详细",
      dataIndex: "content",
      key: "content",
      className: "tableContentFontSize"
    }
  ];

  return <Table dataSource={props.data} columns={columns} size="middle" />;
}

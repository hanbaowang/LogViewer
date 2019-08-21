const defaultConfig = {
  refresh_time: 300 //s
};

export const dateFormatter = "YYYY-MM-DD HH:mm:ss SSS";

export const logListColumns = [
  {
    title: "时间",
    dataIndex: "displayTime",
    width: 250,
    className: "tableContentFontSize"
  },
  {
    title: "级别",
    dataIndex: "level",
    width: 150,
    className: "tableContentFontSize"
  },
  {
    title: "详情",
    dataIndex: "content",
    className: "tableContentFontSize"
  }
];

export default defaultConfig;

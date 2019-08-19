const config = {
  filter: {
    level: "INFO"
  },
  getServicesResp: [
    {
      name: "TestWebsite1",
      logs: [
        {
          log_name: "root.log",
          log_path: "log/root.log"
        },
        {
          log_name: "widgets.log",
          log_path: "log/widgets.log"
        }
      ]
    },
    {
      name: "TestWebsite2",
      logs: [
        {
          log_name: "tomcat.log",
          log_path: "tomcat/tomcat.log"
        },
        {
          log_name: "root.log",
          log_path: "root/root.log"
        }
      ]
    }
  ],
  logs: [
    {
      value: "TestWebsite1",
      label: "TestWebsite1",
      children: [
        {
          value: "log/root.log",
          label: "log/root.log"
        },
        {
          value: "log/widgets.log",
          label: "log/widgets.log"
        }
      ]
    },
    {
      value: "TestWebsite2",
      label: "TestWebsite2",
      children: [
        {
          value: "tomcat/tomcat.log",
          label: "tomcat/tomcat.log"
        },
        {
          value: "root/root.log",
          label: "root/root.log"
        }
      ]
    }
  ]
};

export default config;

package crawler

import (
	"log"

	"github.com/hanbaowang/LogViewer/src/service/io"
	"github.com/hanbaowang/LogViewer/src/service/model"
	"github.com/pkg/sftp"
	"golang.org/x/crypto/ssh"
)

var base string

func getClient(s model.Server) (conn *ssh.Client, client *sftp.Client, err error) {
	clientConfig := &ssh.ClientConfig{
		User: s.User,
		Auth: []ssh.AuthMethod{
			ssh.Password(s.Password),
		},
		HostKeyCallback: ssh.InsecureIgnoreHostKey(),
	}

	conn, err = ssh.Dial("tcp", s.IP+":"+s.Port, clientConfig)
	if err != nil {
		log.Print("conn err, ", err)
		return nil, nil, err
	}

	client, err = sftp.NewClient(conn)
	if err != nil {
		log.Print("sftp err, ", err)
		return nil, nil, err
	}

	return conn, client, err
}

// Run crawler run
func Run() {
	fr := &io.FileReader{
		FileName: "../../demo/servers.json",
	}
	ss, err := fr.ReadServer()
	if err != nil {
		log.Print("get server err, ", err)
	}

	base = ss.Base
	for _, s := range ss.Servers {
		go func(s model.Server) {
			CrawlLogs(s)
		}(s)
	}
}

// CrawlServices crawl services infos and files infos
func CrawlServices(ss model.Servers) []*model.Service {
	base = ss.Base
	var s model.Server
	for _, v := range ss.Servers {
		if v.Role == "master" {
			s = v
			break
		}
	}
	conn, client, err := getClient(s)
	if err != nil {
		log.Fatal("get client err", err)
	}
	defer conn.Close()
	defer client.Close()
	var services []*model.Service

	serviceInfos, err := client.ReadDir(base)

	if err != nil {
		log.Print("get service info err, ", err)
	}

	for _, v := range serviceInfos {
		var service model.Service
		service.Name = v.Name()
		service.Files = getFileFor(base, v.Name(), client)
		services = append(services, &service)
	}

	saveServices(services)

	return services
}

// CrawlLogs Crawl Logs
func CrawlLogs(s model.Server) {
	// client := getClient(s)
	// client.Open()

}

// get file info
func getFileFor(base string, aServiceName string, client *sftp.Client) []model.File {
	var logInfos []model.File
	logPath := base + getFilePathBy(aServiceName)
	logs, err := client.ReadDir(logPath)
	if err != nil {
		log.Print("get log info err, ", err)
	}

	for _, log := range logs {
		if log.IsDir() {
			continue
		}
		var logInfo model.File
		logInfo.Name = log.Name()
		logInfo.Path = logPath + log.Name()
		logInfos = append(logInfos, logInfo)
	}

	return logInfos
}

// a transform to get logs' path
func getFilePathBy(serviceName string) string {
	return serviceName
}

// save services
func saveServices(services []*model.Service) error {
	fw := &io.FileWriter{
		FileName: "../../demo/services.json",
	}
	err := fw.WriteJSON(services)
	return err
}

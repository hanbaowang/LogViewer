package crawler

import (
	"log"

	"github.com/hanbaowang/LogViewer/src/service/server"
	"github.com/pkg/sftp"
	"golang.org/x/crypto/ssh"
)

var base string

func getClient(s server.Server) *sftp.Client {
	clientConfig := &ssh.ClientConfig{
		User: s.User,
		Auth: []ssh.AuthMethod{
			ssh.Password(s.Password),
		},
		HostKeyCallback: ssh.InsecureIgnoreHostKey(),
	}

	conn, err := ssh.Dial("tcp", s.IP+":"+s.Port, clientConfig)
	if err != nil {
		log.Print("conn err, ", err)
	}
	defer conn.Close()

	client, err := sftp.NewClient(conn)
	if err != nil {
		log.Print("sftp err, ", err)
	}
	defer client.Close()

	return client
}

// Run crawler run
func Run(ss server.Servers) {
	base = ss.Base
	for _, s := range ss.Servers {
		go func(s server.Server) {
			CrawlLogs(s)
		}(s)
	}
}

// CrawlServices crawl services infos and files infos
func CrawlServices(s server.Server) []*server.Service {
	client := getClient(s)
	var services []*server.Service

	serviceInfos, err := client.ReadDir(base)
	if err != nil {
		log.Print("get service info err, ", err)
	}

	for _, v := range serviceInfos {
		var service server.Service
		service.Name = v.Name()
		service.Files = getFileFor(v.Name(), client)
		services = append(services, &service)
	}

	saveServices(services)

	return services
}

// CrawlLogs Crawl Logs
func CrawlLogs(s server.Server) {
	// client := getClient(s)
	// client.Open()

}

// get file info
func getFileFor(aServiceName string, client *sftp.Client) []server.File {
	var logInfos []server.File
	logPath := getFilePathBy(aServiceName)
	logs, err := client.ReadDir(logPath)
	if err != nil {
		log.Print("get log info err, ", err)
	}

	for _, log := range logs {
		var logInfo server.File
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
func saveServices(services []*server.Service) error {
	fw := &server.FileWriter{
		FileName: "../../demo/services.json",
	}
	err := fw.WriteJSON(services)
	return err
}
